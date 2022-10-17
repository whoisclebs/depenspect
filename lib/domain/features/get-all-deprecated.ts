import axios, { AxiosResponse } from 'axios'
export async function getAllDeprecated (packageName: string): Promise<any> {
  if (packageName === undefined) {
    return Promise.reject(new Error('package_name is required'))
  }
  const url = `https://registry.npmjs.org/${packageName}`
  return axios.get(url).then(
    async (json: AxiosResponse) => {
      const versions = Object.keys(json.data.versions)
      const deprecatedVersions = versions.filter((version: string) => json.data.versions[version].deprecated)
      const deprecatedVersionsWithInfo = deprecatedVersions.map((version: string) => {
        return {
          version,
          info: json.data.versions[version].deprecated
        }
      })
      return deprecatedVersionsWithInfo
    }
  ).catch(async (err: any) => {
    return Promise.reject(new Error(err))
  })
}
