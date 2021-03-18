export default function ({ $auth }) {
  console.info('auth plugin loggedin: ', $auth.loggedIn)
  // console.log('auth user', $auth.user)
  $auth.onError((error, name, endpoint) => {
    console.error(name, error)
  })

  if (!$auth.loggedIn) {
    return
  }

  const username = $auth.user.username
}
