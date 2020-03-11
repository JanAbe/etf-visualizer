## ETF Visualizer

Get a visualization of the holdings of the ETF.

At the moment it only visualizes the iShares ETF for upcoming markets and is not dynamic in any way.
The idea was to make it so the user can search for a certain ETF, which the app would visualize and display data off.
The problem was that I couldn't find any good data sources besides the one from the iShares ETF for upcoming markets. This is the reason why this functionality has been left out (at least for the moment).
Another problem is that I need the coordinates of the main address of the company that sells the stock the ETF has invested in. So if the ETF has invested in BABA stock, I would need the coordinates of the alibaba company. The problem is that I couldn't find any sources providing this data. The data from the iShares ETF for upcoming markets came closest, in that it provided data about in which country the company that sells the stock is located in, and that it provided the ticker/symbol of the company. Using this data I scraped the yahoo.finance website to gain address information (located on the profile tab, found after looking up a company based on ticker name). Then I used another mapbox service to transform this address into coordinates. If no address were found, or no coordinates were found based on the provided address (which happened quite a lot), I would use the country as the location. This is the reason why for example in the middle of China, a lot of companies are located (at least according to my visualization), even though this is incorrect.

#### Roadmap
- Add a flight to location feature. If a user presses a row in the dataTable, the map flies to the location of this holding.
  - this was almost implemented, but it didn't really work the way i wanted it to. Because of this, i opted to leave it out.
- Add a search feature so the user can search through the dataTable, for example for all holdings located in China.
  - this was almost implemented, but i couldn't find a good place for a searchbar in the UI. Also i didn't want to redo the whole UI for all device-sizes.
