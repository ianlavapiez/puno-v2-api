export default function buildMakeUser({
  sha256,
  sanitize,
  makeSource,
  isValidEmail,
  hashPassword,
}) {
  return function makeUser({
    firstName,
    lastName,
    birthDate,
    educationalBackground,
    address,
    farmAddress,
    organization,
    role,
    email,
    password,
    source,
    createdAt = Date.now(),
    modifiedAt = Date.now(),
    active = true,
  } = {}) {
    if (!firstName) {
      throw new Error('User must have a first name.')
    }

    if (!lastName) {
      throw new Error('User must have a last name.')
    }

    if (!birthDate) {
      throw new Error('User must have a birth date.')
    }

    if (!educationalBackground) {
      throw new Error('User must have educational background.')
    }

    if (!address) {
      throw new Error('User must have an address.')
    }

    if (!email) {
      throw new Error('User must have an email.')
    }

    if (!password) {
      throw new Error('User must have a password.')
    }

    if (!role) {
      throw new Error('User must have a role.')
    }

    if (role === 'farmer') {
      if (!farmAddress) {
        throw new Error('User must have a farm address.')
      }

      if (!organization) {
        throw new Error('User must have an organization or cooperative.')
      }
    }

    let sanitizedFirstName = sanitize(firstName).trim()
    let sanitizedLastName = sanitize(lastName).trim()
    let sanitizedEducationalBackground = sanitize(educationalBackground).trim()
    let sanitizedAddress = sanitize(address).trim()
    let sanitizedRole = sanitize(role).trim()
    let sanitizedEmail = sanitize(email).trim()
    let sanitizedPassword = sanitize(password).trim()
    let sanitizedFarmAddress, sanitizedOrganization

    if (sanitizedFirstName.length < 1) {
      throw new Error('First name must have more characters.')
    }

    if (sanitizedLastName.length < 1) {
      throw new Error('Last name must have more characters.')
    }

    if (sanitizedEducationalBackground.length < 1) {
      throw new Error('Educational Background must have more characters.')
    }

    if (sanitizedAddress.length < 1) {
      throw new Error('Address must have more characters.')
    }

    if (!isValidEmail(sanitizedEmail) && sanitizedEmail.length < 1) {
      throw new Error('Email address must have more characters.')
    }

    if (sanitizedPassword.length < 1) {
      throw new Error('Password must have more characters.')
    }

    if (sanitizedRole.length < 1) {
      throw new Error('Role must have more characters.')
    }

    if (sanitizedRole === 'farmer') {
      sanitizedFarmAddress = sanitize(farmAddress).trim()
      sanitizedOrganization = sanitize(organization).trim()

      if (sanitizedFarmAddress.length < 1) {
        throw new Error('Farm address must have more characters.')
      }

      if (sanitizedOrganization.length < 1) {
        throw new Error('Organization must have more characters.')
      }
    }

    const validSource = makeSource(source)
    const hashedPassword = hashPassword(sanitizedPassword)
    const deletedUser = 'The user has been deleted.'
    let hash

    return Object.freeze({
      getFirstName: () => sanitizedFirstName,
      getLastName: () => sanitizedLastName,
      getBirthDate: () => birthDate,
      getEducationalBackground: () => sanitizedEducationalBackground,
      getAddress: () => sanitizedAddress,
      getRole: () => sanitizedRole,
      getSource: () => validSource,
      getEmail: () => sanitizedEmail,
      getPassword: () => hashedPassword,
      getHash: () => hash || (hash = makeHash()),
      isActive: () => active,
      active: () => {
        active = true
      },
      inactive: () => {
        active = false
      },
      getCreatedAt: () => createdAt,
      getModifiedAt: () => modifiedAt,
    })
  }

  function makeHash() {
    return sha256(sanitizedFirstName + sanitizedLastName + validSource)
  }
}
