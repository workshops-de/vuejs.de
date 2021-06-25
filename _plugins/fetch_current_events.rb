Jekyll::Hooks.register :site, :after_init do |site|
  require 'rest-client'
  if(ENV["JEKYLL_ENV"] != "local") then
    puts "Fetching course..."
    response = RestClient.get('https://workshops.de/api/course/37/events')
    File.write('_data/events/vuejs-typescript.json', response.body)

    response = RestClient.get('https://workshops.de/api/course/37/related-events')
    File.write('_data/related_events/vuejs-typescript.json', response.body)

    response = RestClient.get('https://workshops.de/api/course/44/events')
    File.write('_data/events/vuejs-javascript.json', response.body)

    response = RestClient.get('https://workshops.de/api/course/44/related-events')
    File.write('_data/related_events/vuejs-javascript.json', response.body)

    response = RestClient.get('https://workshops.de/api/course/45/events')
    File.write('_data/events/vuejs-composition-api.json', response.body)

    response = RestClient.get('https://workshops.de/api/course/45/related-events')
    File.write('_data/related_events/vuejs-composition-api.json', response.body)

    puts "Fetching events...done"
  end
end
