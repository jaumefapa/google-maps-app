### Exercice 1:

Given code:

```js
class RegisteredUser {

    constructor(services = []) {
        this.services = services;
    }

    getTotal () {
        let total = 0;

        this.services.forEach(service, index => {
            let multimediaContent = service.getMultimediaContent ();

            if (typeof service == StreamingService) {
                total += multimediaContent.streamingPrice;
            } else if (typeof service == DownloadService) {
                total += multimediaContent.downloadPrice;
            }

            if (typeof multimediaContent == PremiumContent) {
                total += multimediaContent.additionalFee;
            }

        })

        return total;
    }
}
```

ASSUMPTIONS:
- The main idea I got, is that we want to know how much a given user has to pay for the Services he/she has consumed. Sort of a 'purchase history'.

Possible issues:
1. What happens if in the future the MultimediaContent price changes?
2. getTotal() gives you the total of which time period? Current month? All time?

To solve the price issue we would have to record the price, at that time, each time a service is consumed. Kind of a 'purchase history'. For that we would need a new method.

This way, each Service should have a pricePaid and this could get as complex as we need it, ie. pricePaid breakdown into premium fee, currency, discounts applied, etc. For the sake of simplicity I will keep it to just pricePaid being a float number.

So a Service would look like this:
```
Service
- purchaseDate: Timestamp
- pricePaid: float
- serviceType: 'streaming' | 'download' | any_other_future_type
+ getMultimediaContent(): MultimediaContent
```

IMPORTANT: Each time a Service would be consumed, we would have to set the pricePaid. We would need a method for that. This method would check the serviceType, if it's PremiumContent and then set the pricePaid.
We would also have to set the serviceType with another method.

```js
import serviceTypes from '@/globals'

class RegisteredUser {

    constructor(services = []) {
        this.services = services;
    }

    getTotal () {
        // If method was enhanced to support a time period.
        // Then we would filter by service.purchaseDate
        let total = 0;
        this.services.forEach(service => total += this.pricePaid)

        return total;
    }

    setPricePaid () {
        if (this.pricePaid) return

        if (this.serviceType === serviceTypes.STREAMING) {
            this.pricePaid = multimediaContent.streamingPrice;
        }

        if (this.serviceType === serviceTypes.DOWNLOAD) {
            this.pricePaid = multimediaContent.downloadPrice;
        }

        if (multimediaContent.PremiumContent) {
                this.pricePaid += multimediaContent.additionalFee;
            }

        return
    }

}
```

### Exercice 2:

#### Setup:
- Create .env.local file in the root folder
- Add REACT_APP_GOOGLE_MAPS_API_KEY="HERE GOES YOUR GOOGLE MAPS API KEY"
- Run `npm install`
- Run `npm run start`

#### Comments:
1. Test have been added only for the <BoldText /> component. Which highlights in bold the text pieces of a provided text that match a given criteria.

2. To make the map App more efficient and cheap the following has been applied:
- Request less information for Places (main and secondText) 
- Debounce request in autocomplete to 500ms
- Cache results for 1h
- No use index files to import and export all the components
- Used React.memo() for MapComponent

3. Further things that could be done:
- Narrow down autocomplete request by user's location or similar
- Analyze performance with React devtool Profiler
- Don't make use of npm packages and develop specific ones
