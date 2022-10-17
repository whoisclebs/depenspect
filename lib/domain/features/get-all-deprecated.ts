import axios, { AxiosResponse } from 'axios'
export async function getAllDeprecated (packageName: string): Promise<any> {
  if (packageName === undefined) {
    return Promise.reject(new Error('package_name is required'))
  }
  const url = `https://registry.npmjs.org/${packageName}`
  return axios.get(url).then(
    async (res: AxiosResponse) => {
      if (res.status === 404) return Promise.reject(new Error('package not found'))
      if (!res.data.versions) return Promise.reject(new Error('No versions found'))
      const versions = Object.keys(res.data.versions)
      const deprecatedVersions = versions.filter((version: string) => res.data.versions[version].deprecated)
      const deprecatedVersionsWithInfo = deprecatedVersions.map(async (version: string) => {
        return {
          version,
          info: res.data.versions[version].deprecated
        }
      })
      return Promise.all(deprecatedVersionsWithInfo)
    }
  ).catch(async (err: any) => {
    return Promise.reject(new Error(err))
  })
}
