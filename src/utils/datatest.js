import User from '../models/user';
import UserReport from '../models/user-report';
import UserProfile from '../models/user-profile';
import Admin from '../models/admin';
import Gender from '../models/gender';
import Language from '../models/language';

const createUser = async (emailPrefix, role, index, totalSuscriptor) => {
  const newUser = {
    email: `${emailPrefix}${index}@gmail.com`,
    password: '$2a$08$tBPIMsA4.eQyFoBkk3FHvu4ogW7Ywmyr1E7d8LVivtrGH5Z3m8Zjq',
    login_type: 'EMAIL',
    active: true,
    reported: false,
    verified_email: true,
    verified_phone: false,
    verified_gm: true,
    initial_steps: false
  };

  try {
    await User.create(newUser);
  } catch (error) {
    console.error(`Error al crear ${role}:`, error);
  }

  const newUserProfile = {
    user_id: role === 'suscriptor' ? index : parseInt(totalSuscriptor) + index,
    gender_id: 0,
    nickname: `${role}${index}`,
    name: `${emailPrefix}`,
    lastname: `${index}`,
    about_me: `Soy el ${emailPrefix} ${index}`,
    birthdate: Date.now(),  
    language: '1,2',
    smoker: 0,
    looking_for: '1,2',
    status: 1,
    role
  };

  try {
    await UserProfile.create(newUserProfile);
  } catch (error) {
    console.error(`Error al crear el perfil del ${role}:`, error);
  }
};

export const generateTestUsers = async ({ totalSuscriptor, totalCreator }) => {
  for (let i = 1; i <= totalSuscriptor; i++) {
    await createUser('suscriptor', 'suscriptor', i, totalSuscriptor);
  }
  console.log(`Se crearon ${totalSuscriptor} suscriptores.`);

  for (let i = 1; i <= totalCreator; i++) {
    await createUser('creator', 'creator', i, totalSuscriptor);
  }
  console.log(`Se crearon ${totalCreator} creadores.`);
};

export const generateGenders = async () => {
  try {
    await Gender.create({
      description: 'Hombre',
      active: true
    })
    await Gender.create({
      description: 'Mujer',
      active: true
    })
  } catch (err) {
    console.log(err);
  }
};

export const generateLanguages = async () => {
  try {
    await Language.create({
      description: 'Español',
      active: true
    })
    await Language  .create({
      description: 'Inglés',
      active: true
    })
    await Language  .create({
      description: 'Portugués',
      active: true
    })
  } catch (err) {
    console.log(err);
  }
};

export const generateReports = async () => {
  try {
    await UserReport.create({
      from_user_id: 71,
      to_user_id: 1,
      description: "Este usuario está siendo hostigador y utiliza un lenguaje inapropiado."
    })
    await UserReport.create({
      from_user_id: 72,
      to_user_id: 1,
      description: "Estoy experimentando acoso persistente por parte de este usuario."
    })
    await UserReport.create({
      from_user_id: 73,
      to_user_id: 1,
      description: "Este usuario comparte contenido inapropiado y ofensivo."
    })
    await UserReport.create({
      from_user_id: 74,
      to_user_id: 1,
      description: "Este usuario está divulgando mi información personal sin mi permiso."
    })
    await UserReport.create({
      from_user_id: 75,
      to_user_id: 1,
      description: "Este usuario hace comentarios discriminatorios."
    })
  
    await UserReport.create({
      from_user_id: 71,
      to_user_id: 2,
      description: "Estoy siendo amenazado/a y enfrentando un comportamiento intimidante por parte de este usuario."
    })
    await UserReport.create({
      from_user_id: 72,
      to_user_id: 2,
      description: "Sospecho que este usuario está suplantando identidades."
    })
    await UserReport.create({
      from_user_id: 73,
      to_user_id: 2,
      description: "Este usuario está haciendo un uso indebido de la plataforma y enviando spam constantemente."
    })
    await UserReport.create({
      from_user_id: 74,
      to_user_id: 2,
      description: "Este usuario está involucrado en actividades sospechosas y posiblemente fraudulentas."
    })
    await UserReport.create({
      from_user_id: 75,
      to_user_id: 2,
      description: "Este usuario persiste en un comportamiento hostigador y molesto."
    }) 
    await UserReport.create({
      from_user_id: 76,
      to_user_id: 2,
      description: "Este usuario utiliza un tono irrespetuoso y comentarios ofensivos."
    })
  } catch(e) {
    console.log(e);
  } finally {
    console.log('Reportes de prueba generados.');
  }

}

export const generateAdmin = async () => {
  try {
    await Admin.create({
      username: 'admin',
      password: '$2a$08$tBPIMsA4.eQyFoBkk3FHvu4ogW7Ywmyr1E7d8LVivtrGH5Z3m8Zjq',
      active: true
    })
    console.log('Se genero el administrador correctamente.');
  } catch (e) {
    console.log(e);
  }
}