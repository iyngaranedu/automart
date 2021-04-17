const expect = require('chai').expect;
const jwt = require('jsonwebtoken');

const authMiddleware = require('../middleware/is-auth');

describe('Auth Middleware', function () {
  it('should throw an eror if no authorization header is present', function () {
    const req = {
      get: function (headerName) {
        return null
      }
    }

    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw(
      'Not authendicated.'
    )
  });

  it('should throw an eror if the authorization header is only one string', function () {
    const req = {
      get: function (headerName) {
        return 'xyz'
      }
    }

    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw()
  });

  it('should throw an eror if the token cannot be verified', function () {
    const req = {
      get: function (headerName) {
        return 'xyz'
      }
    }

    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw()
  });

  it('should yield a userId after decoding the token', function () {
    const req = {
      get: function (headerName) {
        return 'Bearer 9ajasdkasdlkajsdlajsidoiuasd'
      }
    }

    jwt.verify = function() {
      return { userId: 'abc' };
    };

    authMiddleware(req, {}, () => {});
    expect(req).to.have.property('userId');
  });

})
