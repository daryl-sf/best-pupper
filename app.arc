@app
best-pupper-1957

@aws
runtime nodejs18.x
region eu-west-1
timeout 30

@http
/*
  method any
  src server

@plugins
plugin-remix
  src plugin-remix.js

@static

@tables
user
  pk *String

password
  pk *String # userId

note
  pk *String  # userId
  sk **String # noteId

image
  pk *String  # userId
  sk **String # imageId
