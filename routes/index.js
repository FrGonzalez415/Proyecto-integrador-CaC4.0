
function indexRouter(app, fs, __dirname) {

//                                  RUTAS

//                                  Principal
app.get('/', (req, res) => {
    const index = fs.readFileSync( __dirname + '/public/HTML/index.html', 'utf-8')
    res.type('html').send(index)
})

//                                  Categorías

/* app.get('/categorias', (req, res) => {
    const index = fs.readFileSync( __dirname + '/public/HTML/index.html#categorias', 'utf-8')
    res.type('html').send(index)
}) */

//  Cartas
app.get('/cartas', (req, res) => {
    const cartas = fs.readFileSync( __dirname + '/public/HTML/categoriaCartas.html', 'utf-8')
    res.type('html').send(cartas)
})

//  Clásicos
app.get('/clasicos', (req, res) => {
    const Clásicos = fs.readFileSync( __dirname + '/public/HTML/categoriaClásicos.html', 'utf-8')
    res.type('html').send(Clásicos)
})

//  Cooperativos
app.get('/cooperativos', (req, res) => {
    const Cooperativos = fs.readFileSync( __dirname + '/public/HTML/categoriaCooperativos.html', 'utf-8')
    res.type('html').send(Cooperativos)
})

//  Estrategia
app.get('/estrategia', (req, res) => {
    const Estrategia = fs.readFileSync( __dirname + '/public/HTML/categoriaEstrategia.html', 'utf-8')
    res.type('html').send(Estrategia)
})

//  Familiares
app.get('/familiares', (req, res) => {
    const Familiares = fs.readFileSync( __dirname + '/public/HTML/categoriaFamiliares.html', 'utf-8')
    console.log(req.url)
    res.type('html').send(Familiares)
})

//                                  Registro
app.get('/registro', (req, res) => {
    const registro = fs.readFileSync( __dirname + '/public/HTML/registro.html', 'utf-8')
    res.type('html').send(registro)
})

//                                  Inicio de sesión
app.get('/login', (req, res) => {
    const login = fs.readFileSync( __dirname + '/public/HTML/iniciarSesion.html', 'utf-8')
    res.type('html').send(login)
})

//                                  Contacto
app.get('/contacto', (req, res) => {
    const contacto = fs.readFileSync( __dirname + '/public/HTML/contacto.html', 'utf-8')
    res.type('html').send(contacto)
})

//                                  Nosotros
app.get('/nosotros', (req, res) => {
    const nosotros = fs.readFileSync( __dirname + '/public/HTML/nosotros.html', 'utf-8')
    res.type('html').send(nosotros)
})

//                                  Terminos y condiciones
app.get('/terminos-y-condiciones', (req, res) => {
    const terminos = fs.readFileSync( __dirname + '/public/HTML/terminos.html', 'utf-8')
    res.type('html').send(terminos)
})

//                                  Arrepentimiento de compra
app.get('/arrepentimiento', (req, res) => {
    const arrepentimiento = fs.readFileSync( __dirname + '/public/HTML/arrepentimiento.html', 'utf-8')
    res.type('html').send(arrepentimiento)
})

/* //                                  Error 404
app.get('*', (req, res) => {
    const error404 = fs.readFileSync( __dirname + '/public/HTML/404.html', 'utf-8')
    res.type('html').send(error404)
}) */

}

export default indexRouter
