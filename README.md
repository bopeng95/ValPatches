# ValPatches
## about
- discord bot for scraping valorant patch notes
- fetches from my api [here](https://github.com/bopeng95/valapi)
## available commands
### prefix - `vp!`
```
vp!fetch // use at initial start, nothing is cached in the beginning
```
- fetches for the most recent patch notes and caches it
- throttled for 60 seconds before you can request again
- should be used when a new patch notes come out on Valorant's [news site](https://playvalorant.com/en-us/news/)

```
vp!info
```
- lists out the patch notes into categories
```
vp!info <value>
```
- shows selected patch category details
```
vp!hl
```
- shows the highlight image of recent patch
```
vp!commands
```
- shows all the available commands
