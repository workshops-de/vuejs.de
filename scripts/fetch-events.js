#!/usr/bin/env node

/**
 * Fetches event data from workshops.de API
 * Equivalent to Jekyll plugin: fetch_current_events.rb
 */

import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'src/data');

const COURSES = [
  { id: 37, name: 'vuejs-typescript' },
  { id: 44, name: 'vuejs-javascript' },
  { id: 45, name: 'vuejs-composition-api' },
];

async function fetchEvents() {
  // Skip in local development if env var is set
  if (process.env.SKIP_API_FETCH === 'true') {
    console.log('⏭️  Skipping events fetch (SKIP_API_FETCH=true)');
    return;
  }

  console.log('📥 Fetching events...');

  for (const course of COURSES) {
    // Fetch events
    try {
      const eventsUrl = `https://workshops.de/api/course/${course.id}/events`;
      const response = await fetch(eventsUrl);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();

      const filePath = path.join(DATA_DIR, 'events', `${course.name}.json`);
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      console.log(`  ✓ events/${course.name}.json`);
    } catch (error) {
      console.error(`  ✗ events/${course.name}.json: ${error.message}`);
    }

    // Fetch related events
    try {
      const relatedUrl = `https://workshops.de/api/course/${course.id}/related-events`;
      const response = await fetch(relatedUrl);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();

      const filePath = path.join(DATA_DIR, 'related_events', `${course.name}.json`);
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      console.log(`  ✓ related_events/${course.name}.json`);
    } catch (error) {
      console.error(`  ✗ related_events/${course.name}.json: ${error.message}`);
    }
  }

  console.log('✅ Fetching events...done\n');
}

fetchEvents().catch(console.error);



