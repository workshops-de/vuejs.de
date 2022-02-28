Jekyll::Hooks.register :site, :after_init do |site|
  require 'rest-client'
  puts "Fetching meetups..."
  filename = '_data/meetups.json'

  meetups = [
    'Stuttgart-Vue-js-Meetup',
    'Hamburg-Vue-js-Meetup',
    'vuejsvienna',
    'Vue-JS-Cologne',
    'vue-nfe',
    'vuejsfrankfurt',
    'Vue-js-Berlin',
    'Vue-js-Meetup-Leipzig',
    'Vue-js-Munich',
    'vue_zurich',
    'Vue-Bern'
  ]

  if(ENV["JEKYLL_ENV"] == "production") then
    File.write(filename, '[')
    meetups.each {
      |meetup|
      response = RestClient.get("https://api.meetup.com/#{meetup}?&sign=true&photo-host=public")
      File.write(filename, response.body, File.size(filename) , mode: 'a')
      File.write(filename, ',', File.size(filename) , mode: 'a')
      }
    File.write(filename, ']',File.size(filename)-1 , mode: 'a')


    puts "Fetching meetups...done"
  else
    puts "JEKYLL_ENV NOT PRODUCTION - Meetup fetch aborted"
  end
end
