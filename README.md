# Introduction

Testing socket.io and passing event data to client to use with Grooveshark's JS API or custom api controlling a flash music player

## Installation

`$ npm install`


## Usage

To run server
 
`$ coffee server.coffee`

To connect client, connect with browser: <http://localhost:1978>

Then from server on command line, can type in commands for events to emit:

`$ woot<enter>`
 
`$ hey<enter>`
 
`$ play<enter>`


## Todo

1. Will tie in custom command to emit event that will run method on `Groove.object` that is loaded on the client. This will control flash player


