import storage from 'good-storage'

const DRIVER_GPS_ENABLED = '__DRIVER_GPS_ENABLED__'
const USER = '__DRIVER_USER__'

export function getGpsEnabled() {
  return storage.get(DRIVER_GPS_ENABLED, null)
}

export function setGpsEnabled(enabled) {
  storage.set(DRIVER_GPS_ENABLED, enabled)
}

export function getUser() {
  return storage.get(USER, null)
}

export function putUser(user) {
  storage.set(USER, user)
}

export function logout() {
  storage.clear()
}

export function remove(key) {
  storage.remove(key)
}
