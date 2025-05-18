import axios from 'axios';

export default class BaseController {
    async request(method, path, payload = null) {
        const url = `${import.meta.env.VITE_BASE_URL}${path}`
        try {
            const res = await axios({
              method,
              url,
              data: payload,
            });
            return res.data;
          } catch (err) {
            throw new Error(err);
          }
    }

    async create(payload, path) {
        return await this.request('post', path, payload)
    }

    async read(path) {
        return await this.request('get', path)
    }

    async update(id, payload, path) {
        return await this.request('patch', `${path}/${id}`, payload)
    }

    async delete(id, path) {
        return await this.request('delete', `${path}/${id}`)
    }
}
