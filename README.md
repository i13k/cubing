# cubing
Software for directing a speedcubing competition. Currently very basic.
To get started,
* create a mongoDB database called `cubing`,
* create a collection called `info`,
* import `public/info.json` into it.
* There are also other things you need to do, this readme is incomplete.
Then, run `npm i` and `npm run dev` for a development setup, or `npm build && npm run start` for a production setup.

Stuff to note:
* `info/currentRoute` specifies the route that all projectors will go to,
* to setup a projector, just go to `http://<IP address or FQDN of server>:3000/`,
* there are 3 contest types - `M` for mean, which takes the arithmetic mean of all scores, `B` for best, which takes into account only the best score, and `A` for average, which removes the best and worst result and takes the average of the rest

Useful links:
* `http://app/` - projector,
* `http://app/admin/contest` - contest administration (very basic for now),
* `http://app/admin/registration` - tell people at the registration desk to open this on their phones,
* `http://app/admin/judge` - to enter scores into the system, for use by the judges.
