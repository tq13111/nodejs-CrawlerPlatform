const http_base_error=require('./http_base_error')

const ERROR_COED=4040000
class resource_not_found_error extends http_base_error {
  constructor(resourceName,resourceId,httpMsg) {
    super(404,httpMsg,ERROR_COED,
      `${resourceName} not found, id ${resourceId}`
    )
  }
}

module.exports = resource_not_found_error