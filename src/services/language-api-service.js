import config from '../config'
import TokenService from './token-service'

const LanguageApiService = {
    getLanguage() {
        return fetch(`${config.API_ENDPOINT}/language`, {            
            headers: {
                'authorization' : `Bearer ${TokenService.getAuthToken()}`,
            },
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },

    getWordAtHead() {
        return fetch(`${config.API_ENDPOINT}/language/head`, {            
            headers: {
                'authorization' : `Bearer ${TokenService.getAuthToken()}`,
            },
        })
            .then(res => 
                (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
            )
    },

    postAnswer(guess) {
        return fetch(`${config.API_ENDPOINT}/language/guess`, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
                'authorization' : `Bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify({ guess }),
        })
            .then(res =>
                (!res.ok)
                ? res.json().then(err => Promise.reject(err))
                : res.json()
            )
    },
}

export default LanguageApiService;