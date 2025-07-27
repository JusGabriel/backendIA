// controllers/administradorController.js
import Admin from '../models/Admin.js'

export const registrarAdministrador = async (req, res) => {
  const { email, password } = req.body

  // Validación básica
  if (!email || !password) {
    return res.status(400).json({ message: 'Email y contraseña son obligatorios' })
  }

  try {
    // Verificar si el administrador ya existe
    const adminExistente = await Admin.findOne({ email })
    if (adminExistente) {
      return res.status(400).json({ message: 'El administrador ya está registrado' })
    }

    // Crear una instancia del modelo Admin
    const nuevoAdmin = new Admin({ email })

    // Encriptar y asignar la contraseña
    nuevoAdmin.password = await nuevoAdmin.encryptPassword(password)

    // Guardar en base de datos
    await nuevoAdmin.save()

    res.status(201).json({
      message: 'Administrador registrado exitosamente',
      admin: {
        id: nuevoAdmin._id,
        email: nuevoAdmin.email,
        createdAt: nuevoAdmin.createdAt
      }
    })
  } catch (error) {
    console.error('Error al registrar administrador:', error)
    res.status(500).json({ message: 'Error del servidor' })
  }
}
