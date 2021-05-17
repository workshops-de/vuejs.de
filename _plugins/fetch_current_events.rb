Jekyll::Hooks.register :site, :after_init do |site|
  require 'rest-client'
  response = RestClient.get('https://workshops.de/api/course/37/events')
  File.write('_data/events/vuejs-typescript.json', response.body)

  response = RestClient.get('https://workshops.de/api/course/44/events')
  File.write('_data/events/vuejs-javascript.json', response.body)

  response = RestClient.get('https://workshops.de/api/course/45/events')
  File.write('_data/events/vuejs-composition-api.json', response.body)
end
