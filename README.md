# notes on the newsletter signup

## also pertains to other forms (contact)

combine handler function and this for PE
https://dev.to/mfrachet/astro-progressively-enhanced-forms-442g

Also, the message from xata is not a user friendly message.
Be sure to properly log those messages for debug and customer tech support
but leave a purty message for the UI

I believe the api should be kept simple and take input, process, return output.
Let the UI redirecti it's self or handle responses however but the api only returns a response
with json stringified object, success or failure and any error messages meant for the UI. Other errors
should be logged appropriately in the api and never get sent to the UI.
So I'll be rewritting all of this.

1. use PE
2. use fetch
3. handle response

build a single catchall page for failures in cases where redirect is needed. Not a separate one for newsletter failure, something else failure, another thing failure, etc.
