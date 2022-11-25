const swaggerDescription = '<h2> Microservicio encargado de enviar notificaciones <h2>'
const test = `<h2>Microservicio encargado del env&iacute;o de notificaciones</h2><p>El microservicio tiene por finalidad la gesti&oacute;n de notificaciones push, asociadas a un usuario en particular (se guardan en mongo), con la posiblidad de enviarlas por correo electr&oacute;nico al mismo usuario.</p><h3><span style="text-decoration: underline;"><span style="color: #333399; text-decoration: underline;">Casos de uso</span></span></h3><h4>CU: Crear Notificaci&oacute;n</h4><p>El caso de uso crear notificaci&oacute;n crea una notificaci&oacute;n push para un usuario especificado. Adicionalmente se env&iacute;a un correo electr&oacute;nico a la casilla del usuario si la severidad indicada es mayor a cero.</p>
<ul>
<li>Precondici&oacute;n: Usuario dado de alta</li>
<li>Camino normal: Crea una notificaci&oacute;n para el usuario indicado. Si adem&aacute;s la severidad (atributo "severity") es mayor que cero, env&iacute;a una copia de la notificaci&oacute;n v&iacute;a correo electr&oacute;nico a la casilla del usuario.</li>
</ul>
<h4>CU: Leer Notificaci&oacute;n</h4>
<p>El caso de uso leer notificaci&oacute;n recupera los datos completos para una notificaci&oacute;n, especificando su id.</p>
<ul>
<li>Precondici&oacute;n: Notificaci&oacute;n existente</li>
<li>Camino normal: Se actualiza la notificaci&oacute;n marcando su atributo "readed" con el timestamp actual.</li>
</ul>
<h4>CU: Obtener todas las notificaciones de usuario</h4>
<p>El caso de uso obtener notificaciones de usuario, retorna para un usuario indicado mediante su id todas las notificaciones que posee.</p>
<ul>
<li>Precondici&oacute;n: Usuario dado de alta</li>
<li>Camino normal: En base a un usuario, se obtienen todas las notificaciones que posee.</li>
<li>Camino alternativo: Si el usuario no posee notificaciones,&nbsp; se devolver&aacute; un listado vac&iacute;o.</li>
</ul>
<h4>CU: Obtener notificaciones no le&iacute;das de usuario</h4>
<p>El caso de uso obtener notificaciones no le&iacute;das de usuario, retorna para un usuario indicado mediante su id todas las notificaciones no le&iacute;das que posee.</p>
<ul>
<li>Precondici&oacute;n: Usuario dado de alta</li>
<li>Camino normal: En base a un usuario, se obtienen todas las notificaciones no le&iacute;das que posee.</li>
<li>Camino alternativo: Si el usuario no posee notificaciones, o todas han sido le&iacute;das, se devolver&aacute; un listado vac&iacute;o.</li>
</ul>
<h4>CU: Recuperar Notificaci&oacute;n</h4>
<p>Caso de uso para recuperar una notificaci&oacute;n con todas sus propiedades.</p>
<ul>
<li>Precondici&oacute;n: Notificaci&oacute;n existente</li>
<li>Camino normal: Se obtiene una notificaci&oacute;n junto con todos sus propiedades mediante la especificaci&oacute;n de su id.</li>
</ul>
<h3><span style="text-decoration: underline;"><span style="color: #000080; text-decoration: underline;">Interfaz asincr&oacute;nica</span></span></h3>
<h4>Notificaci&oacute;n de evento as&iacute;ncrono</h4>
<p>Permite notificar de manera as&iacute;ncrona cualquier evento relacionado a un usuario. Se incluye la severidad para indicar si adem&aacute;s de crear la notificaci&oacute;n, debe enviarse por mail.</p>
<blockquote>
<p>{<br />&nbsp; "recipentId": "string",<br />&nbsp; "senderId": "string",<br />&nbsp; "subject": "string",<br />&nbsp; "message": "string",<br />&nbsp; "severity": 0<br />}</p>
</blockquote>
<h4>Relaci&oacute;n con otros microservicios</h4>
<p>Desde el microservicio de cart, cuando realiza un checkout env&iacute;a un mensaje por la cola MQ para notificar al usuario indicando que se est&aacute; procesando el carrito.</p>
<p>Finalmente, desde el microservicio de order se env&iacute;a otro mensaje as&iacute;ncrono por la cola MQ notificando que la orden ha sido creada correctamente.</p>
<p>&nbsp;</p>`

export const fastifyConfig = {}

export const notificationsConfig = () => {
  return {
    sendgridApiKey: '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',
    from: 'microservicios@mivecindario.com.ar'
  }
}

export const mongoConfig = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost/default'
}

export const swaggerConfig = {
  routePrefix: '/swagger',
  swagger: {
    info: {
      title: 'Ecommerce Notifications',
      description: test,
      version: '1.0.0',
      contact: {
        name: 'Marcos',
        surname: 'Luna',
        email: 'lunamarcose@gmail.com'
      }
    },
    host: 'localhost:5000',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json']
  },
  exposeRoute: true
}

export const swaggerUIConfig = {
  routePrefix: '/documentation',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false
  },
  staticCSP: true,
  transformStaticCSP: (header: any) => header
}

export const rabbitConfig = () => {
  return {
    url: 'amqp://localhost',
    queue: 'notifications'
  }
}

// export declare const swaggerConfig: () => {
//   swagger: {
//     info: {
//       title: 'Microservicio Ecommerce Notificaciones'
//       description: 'Servicio encargado de notificaciones para ecommerce'
//       version: '1.0.0'
//     }
//     definitions: {
//       User: {
//         type: 'object'
//         required: ['id', 'email']
//         properties: {
//           id: { type: 'string'; format: 'uuid' }
//           firstName: { type: 'string' }
//           lastName: { type: 'string' }
//           email: { type: 'string'; format: 'email' }
//         }
//       }
//     }
//   }
//   openapi: {
//     info: {
//       title: string
//       version: string
//     }
//   }
//   exposeRoute: true
//   routePrefix: string
// }
