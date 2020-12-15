## Documentación

Aquí podrás encontrar lo necesario para poder entender el funcionamiento de este proyecto desde la instalación hasta su uso. Sigue leyendo para poder comprenderlo todo.

## Contenido 📘

1. [Documentación técnica](#documentación-técnica)
   - [Requisitos del sistema](#requisitos-del-sistema)
   - [Clonando el repositorio](#clonando-el-repositorio)
   - [Instalando los paquetes necesarios](#instalando-los-paquetes-necesarios)
   - [Ejecutando el proyecto](#ejecutando-el-proyecto)
2. [Manual de usuario](#manual-de-usuario)
3. [Manual técnico](#manual-técnico)

## Documentación técnica

Aquí podrás ver todo lo referente a las instrucciones necesarias para clonar y ejecutar este proyecto en tu computadora.

### Requisitos del sistema

Esto es todo lo que necesitas para poder usar este simulador en tu equipo.

| _Software_ | Versión mínima |
| ---------- | -------------- |
| Node.js    | 12.x           |
| npm        | 6.x            |

Puedes descargar Node.js [aquí](https://nodejs.org/en/).

### Clonando el repositorio

Este repositorio está alojado en Github, hay dos maneras disponibles para clonarlo.

#### Cliente de escritorio

Github ofrece un programa para escritorio y puedes descárgarlo [aquí](https://desktop.github.com/). Una vez lo tengas instalado puedes clonarlo haciendo referencia al repositorio por medio de este enlace:

```
https://github.com/fabricioism/gas-station-simulation.git
```

#### Vía terminal de comandos

Esto lo puedes hacer mediante Git, lo puedes descargar [aquí](https://git-scm.com/).

Pasos:

1. Abre la terminal.
2. Muévete al directorio donde deseas clonar el repositorio.
3. Pega y ejecuta en la terminal el siguiente comando:

```
git clone https://github.com/fabricioism/gas-station-simulation.git
```

Una vez hayas clonado el repositorio tendrás una nueva carpeta con el nombre del repositorio, este contiene en su interior el código fuente del simulador.

### Instalando los paquetes necesarios

Con tu editor de texto favorito ([VSC](https://code.visualstudio.com/), [_Sublime text_](https://www.sublimetext.com/)) abre la carpeta donde clonaste el proyecto y posteriormente abre la terminal. Hecho lo anterior ejecuta el siguiente comando:

```
npm install
```

Esto instalará todos los paquetes necesarios para ejecutar el proyecto.

### Ejecutando el proyecto

Ya todo está listo para la ejecución del simulador. En la terminal ejecuta el siguiente comando:

```
node server.js
```

Con el comando anterior el servidor local inicia su ejecución y en el puerto `3000` se ejecuta el simulador. Abre tu navegador y en la barra de direcciones copia la siguiente URL: `http://localhost:3000/`

Se cargará el simulador y desde ese momento ya podrás hacer uso de el.

## Manual técnico

### Herramientas utilizadas

1. Javascript (cliente y servidor)
2. HTML (cliente)
3. CSS (cliente)
4. Bootstrap (cliente) leer más [aquí](https://getbootstrap.com/).
5. Socket<span>.I</span>O (comunicación cliente-servidor) leer más [aquí](https://socket.io/).
6. Hypertimer (simulación del tiempo) leer más [aquí](https://www.npmjs.com/package/hypertimer).

### Interacción cliente-servidor

La interacción cliente-servidor se genera de múltiples maneras, como puede ser la obtención de los datos iniciales, cambio de variables de estado, inicio, pausa, continuar, finalizar y las actualizaciones que debe recibir el cliente. En los siguientes esquemas se detalla de forma visual de estas interacciones.

#### Variables de estado

![Diagrama 1 - Obtención de variables de estado](images/diagrama1.png)

Al cargar el cliente del simulador y acceder a la URL `http://localhost:3000/` el cliente enviará una solicitud para obtener las variables de estado (según el último valor que se almaceno). El servidor devolverá las variables de estado que estaban almacenadas.

![Diagrama 2 - Modificación de variables de estado](images/diagrama2.png)

Previo a iniciar la simulación el usuario puede elegir modificar las variables de estado (capacidad máxima y mínima del tanque de un auto, tiempo que toma preparar el auto previo y pos llenado, porcentaje máximo del tanque que puede traer ocupado un auto, porcentaje de autos que usan gasolina como combustible y la tasa de llegada a la estación). El servidor devolverá una respuesta exitosa luego de verificar que los valores ingresados se encuentren en los rangos correctos, de lo contrario enviará una respuesta no exitosa.

#### Durante la simulación

![Diagrama 4 - Pausa de una simulación](images/diagrama4.png)

El usuario puede pausar la simulación en cualquier momento, cuando decide hacerlo se envía la solicitud de pausa al servidor, el servidor devolverá una respuesta exitosa en caso de que la simulación se esté ejecutando y aun no haya finalizado, caso contrario devolverá una respuesta no exitosa.

![Diagrama 5 - Continuación de una simulación](images/diagrama5.png)

Luego de haber pausado una simulación el usuario puede elegir continuar con ella, en este caso se enviará una solicitud de continuar al servidor, el servidor devolverá una respuesta exitosa en caso de que la simulación este pausada y aun no haya finalizado, caso contrario devolverá una respuesta no exitosa.

![Diagrama 6 - Actualización de una simulación](images/diagrama6.png)

El servidor se encarga de enviar actualizaciones al cliente al suceso de dos eventos, los cuales son:

1. Ingreso de un vehículo a la estación.
2. Un vehículo sale de la estación luego de ser atendido o si no hay combustible del tipo que solicitaba.

La actualización contiene la información necesaria para mostrar los niveles de almacenaje de cada tipo de combustible, los datos a mostrar de cada bomba de la estación, el resumen de toda la estación y además un estado de finalizado en caso de que la estación se quede sin combustible. En caso de que la estación se quede sin combustible para suplir la simulación se detendrá.

![Diagrama 7 - Finalización de una simulación](images/diagrama7.png)

El usuario es capaz de finalizar una simulación que se esté ejecutando luego de haberla iniciado y sin importar si esta pausada o no, se envía la solicitud al servidor para finalizar la simulación, el servidor finaliza todo en caso de que haya una simulación iniciada y envía una respuesta de éxito, caso contrario se envía una respuesta no exitosa.

## Manual de usuario

### Equipo de desarrollo

- **Fabricio Murilo** - [fabricioism](https://github.com/fabricioism)
- **Josue Silva** - [JosueSilvaA](https://github.com/JosueSilvaA)
- **Nelson Díaz** - [NDz23](https://github.com/NDz23)
