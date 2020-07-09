const configSetup = {
  prod: {},
  stage: {},
  local: {
    url: 'http://localhost:3000/',
    redirect: '/bad',
  },
}

export const apiGenric = {}
export const apiGlobalErrors = {}

export default configSetup.local //hack for test, normally envioment variables
