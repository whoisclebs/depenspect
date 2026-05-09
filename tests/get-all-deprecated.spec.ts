import { getAllDeprecated } from '../lib/domain/features/get-all-deprecated'

const fetchMock = jest.fn()

describe('getAllDeprecated', () => {
  beforeEach(() => {
    fetchMock.mockReset()
    Object.defineProperty(global, 'fetch', {
      configurable: true,
      value: fetchMock
    })
  })

  it('rejects empty package names', async () => {
    await expect(getAllDeprecated('')).rejects.toThrow('package_name is required')
  })

  it('uses an encoded npm registry URL for scoped packages', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ versions: {} })
    })

    await getAllDeprecated('@scope/package')

    expect(fetchMock).toHaveBeenCalledWith('https://registry.npmjs.org/@scope%2Fpackage')
  })

  it('returns deprecated versions with their deprecation info', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({
        versions: {
          '1.0.0': {},
          '1.1.0': { deprecated: 'use 2.0.0' }
        }
      })
    })

    await expect(getAllDeprecated('left-pad')).resolves.toEqual([
      {
        version: '1.1.0',
        info: 'use 2.0.0'
      }
    ])
  })

  it('rejects packages that are not found', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => ({})
    })

    await expect(getAllDeprecated('missing-package')).rejects.toThrow('package not found')
  })
})
