<p align="center">
  <img src="https://user-images.githubusercontent.com/10660468/41635501-180a6472-7417-11e8-878f-86c86b10a174.png" width="400" alt="Streamydoo">
</p>
<p align="center">Easy to use stream request handler for your browser<p>
<p align="center">
  <a href="https://npmjs.org/packages/streamydoo"><img src="https://img.shields.io/npm/v/streamydoo.svg" alt="npm package" /></a>
</p>

## Usage

```bash
npm install streamydoo
```

```js
import Streamydoo from 'streamydoo'

const streamer = new Streamydoo('/some-stream-url')

streamer.on('data', value => {
  console.log(`New data: ${value}`)
})

streamer.on('end', () => {
  console.log('All done!')
})

streamer.send()
```