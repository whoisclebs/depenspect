interface NpmPackageMetadata {
  versions?: Record<string, {
    deprecated?: string
  }>
}

export interface DeprecatedVersion {
  version: string
  info: string
}

export async function getAllDeprecated (packageName: string): Promise<DeprecatedVersion[]> {
  if (packageName === undefined || packageName.trim() === '') {
    throw new Error('package_name is required')
  }

  const registryPackagePath = encodeURIComponent(packageName).replace(/^%40/, '@')
  const url = `https://registry.npmjs.org/${registryPackagePath}`
  const response = await fetch(url)

  if (response.status === 404) {
    throw new Error('package not found')
  }

  if (!response.ok) {
    throw new Error(`registry request failed with status ${response.status}`)
  }

  const data = await response.json() as NpmPackageMetadata

  if (data.versions === undefined) {
    throw new Error('No versions found')
  }

  return Object.entries(data.versions)
    .filter(([, metadata]) => metadata.deprecated !== undefined)
    .map(([version, metadata]) => ({
      version,
      info: metadata.deprecated as string
    }))
}
