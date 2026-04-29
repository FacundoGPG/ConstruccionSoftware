module.exports = (req, res, next) => {
    if(! req.session.isLoggedIn){
        return res.redirect("/usuarios/login");
    }
    next();
};

router.post('/notas/crear', isAuth, hasPermission('crear_nota'), controller.post_crear);
//                                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^
//                                  esto es un middleware Express normal