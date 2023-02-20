Jekyll::Hooks.register :site, :after_init do |site|
  require 'rest-client'
  if(ENV["JEKYLL_ENV"] != "local") then
    puts "Fetching trainers..."

    response = RestClient.get('https://workshops.de/api/portal/vuejs-de/trainers')
    File.write('_data/trainers.json', response.body)

    response = RestClient.get('https://workshops.de/api/course/37/trainers')
    File.write('_data/course_trainers/vuejs-typescript.json', response.body)

    response = RestClient.get('https://workshops.de/api/course/44/trainers')
    File.write('_data/course_trainers/vuejs-javascript.json', response.body)

    response = RestClient.get('https://workshops.de/api/course/45/trainers')
    File.write('_data/course_trainers/vuejs-composition-api.json', response.body)

    puts "Fetching trainers...done"
  end
end
