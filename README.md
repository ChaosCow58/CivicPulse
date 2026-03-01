# CivicPulse

2026 PickHacks Project

# About the project

## Inspiration
How often has an issue in your community bothered you? Flash flooding, construction on your drive to work, exposed electrical wiring, and even trash on the sidewalk are all annoying and often dangerous public issues.
These issues all seem easy to solve, but they sometimes go unnoticed and unfixed for months. Wouldn’t an early warning system for community problems be great? What about a way to report problems that you notice? This can all be done with CivicPulse, the community issue map!

## What it does
CivicPulse’s frontend is simple. The main page is a world map, where all reported issues are displayed. Users can simply search for any location via address, city, country, or even latitude/longitude coordinates. Then they can see issues that other members of the community have. The map is color-coded, so users can easily see different report categories.
Anywhere on the map, users can submit a report about any kind of issue. Afterwards, reports can be voted on or “liked” by other users, which shows how many people agree that the report is accurate and needs to be resolved.
When a report is resolved, users can mark it as resolved. When enough users have marked a report, the report will disappear, having been fixed.

## How we built it
We use an M0 MongoDB cluster to store our database. This database stores our users and their information, as well as user reports.
Auth0 is used for login, and we connect that data to MongoDB using the Prisma ORM.
Leaflet is used for map navigation and rendering, and leaflet-control-geocoder is used for our map search function.
Everything is rendered and connected using Next.js.
We build several REST API endpoints for delivering and fetching data.

## Challenges we ran into
Leaflet was quite difficult to get running originally. It was not something any of us have worked with in the past. Once we got past the hurdle of setting everything up, it was quite intuitive.
Displaying data was also difficult to get set up. Connecting our MongoDB database with our Leaflet frontend to display real time updates took quite a bit of time.
We ran out of time for some parts of the project. We created something we are proud of, but we definitely could have expanded further.

## Accomplishments that we're proud of
Our MongoDB database is robust and has all of the functionality necessary for a smooth developer experience and seamless client experience. It provides great functionality to store both users and reports.
Showing changes to our report map in real time is incredibly useful. It allows users to see the changes themselves and others make immediately.

## What we learned
This was our second hackathon as a group, and we continue to learn better ways to work together and create innovative applications. We have utilized Git’s version control in a much more efficient way, with a main branch, dev branch, and 4 separate personal branches. Our workflow was significantly smoother using this.
We’ve become much more familiar with MongoDB and its user interface.
We have learned how to work with powerful tools like Leaflet’s mapping API and Auth0’s user identification.
We learned that the scope of our projects need to fit into the time allotted. We had some ideas that we did not have time to implement in the restricted timeframe.

## What's next for CivicPulse
We believe CivicPulse can be used to improve real communities in the real world. The prototype we’ve built over the last couple of days shows great promise, more than we had imagined when we began brainstorming. We are seriously considering developing our idea further after this weekend.
