module.exports = {
    // Se o usuário foi autenticado redireciona pra proxima página,
    // caso contrário envia para a página de login
    ensureAuth: function (req, res, next) {
      if (req.isAuthenticated()) {
        return next()
      } else {
        res.sendStatus(401);
      }
    },
  }