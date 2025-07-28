import User from '../models/User.js';

const registro = async (req, res) => {
  const { nombre, email, password } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({ msg: "Todos los campos son obligatorios" });
  }

  const existe = await User.findOne({ email });
  if (existe) {
    return res.status(400).json({ msg: "Este email ya está registrado" });
  }

  const nuevoUsuario = new User({ nombre, email });
  nuevoUsuario.password = await nuevoUsuario.encryptPassword(password);

  await nuevoUsuario.save();

  res.status(201).json({ msg: "Usuario registrado correctamente" });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Todos los campos son obligatorios" });
  }

  const usuario = await User.findOne({ email });
  if (!usuario) {
    return res.status(404).json({ msg: "Usuario no encontrado" });
  }

  const passValido = await usuario.matchPassword(password);
  if (!passValido) {
    return res.status(401).json({ msg: "Contraseña incorrecta" });
  }

  // Para logout sin token, no devolvemos token ni nada
  res.status(200).json({
    msg: "Login exitoso",
    user: {
      id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email
    }
  });
};

const logout = (req, res) => {
  // Si no usas tokens, logout es solo respuesta para que el cliente borre datos localmente
  res.status(200).json({ msg: "Sesión cerrada correctamente" });
};

export {
  registro,
  login,
  logout
};
