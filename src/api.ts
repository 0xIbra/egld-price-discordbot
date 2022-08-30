// @ts-ignore
import fetch from 'node-fetch'

class ElrondClient {

    static info() {
        return {
            endpoint: process.env.ENDPOINT_URI || 'https://api.elrond.com/economics'
        }
    }

    static async getData() {
        let { endpoint } = ElrondClient.info()
        let data = await (await fetch(endpoint)).json()

        return data
    }

    static async getCurrentPrice() {
        let data: any = await ElrondClient.getData()

        return data.price
    }
}

export default ElrondClient