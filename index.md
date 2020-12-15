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

## Manual de usuario

## Manual técnico

### Interacción cliente-servidor

La interacción cliente-servidor se genera de múltiples maneras, como puede ser la obtención de los datos iniciales, cambio de variables de estado, inicio, pausa, continuar, finalizar y las actualizaciones que debe recibir el cliente. En los siguientes esquemas se detalla de forma visual estas interacciones.

#### Obtención de variables de estado

![Diagrama 1 - Obtención de variables de estado](images/diagrama1.png)

Al cargar el cliente del simulador y acceder a la URL `http://localhost:3000/` el cliente enviara una solicitud para obtener las variables de estado (según el último valor que se almaceno). El servidor devolverá las variables de estado que estaban almacenadas.

#### Modificación de variables de estado

![Diagrama 2 - Modificación de variables de estado](images/diagrama2.png)

Previo a iniciar la simulación el usuario puede elegir modificar las variables de estado (capacidad máxima y mínima del tanque de un auto, tiempo que toma preparar el auto previo y pos llenado, porcentaje máximo del tanque que puede traer ocupado un auto, porcentaje de autos que usan gasolina como combustible y la tasa de llegada a la estación). El servidor devolverá una respuesta exitosa luego de verificar que los valores ingresados se encuentren en los rangos correctos, de lo contrario enviará una respuesta no exitosa.

#### Inicio de una simulación

![Diagrama 3 - Inicio de una simulación](images/diagrama3.png)

Cuando el usuario inicia la simulación se envían los datos de entrada al servidor para poder empezar a simular la estación de combustible. El servidor envía una respuesta de éxito en caso de que se haya logrado iniciar la simulación. Solo se puede ejecutar una simulación a la vez, no pueden existir múltiples clientes simulando al mismo tiempo, si se trata de iniciar cuando ya existe otro cliente simulando se devolverá una respuesta no exitosa.

### Equipo de desarrollo

- **Fabricio Murilo** - [fabricioism](https://github.com/fabricioism)
- **Josue Silva** - [JosueSilvaA](https://github.com/JosueSilvaA)
- **Nelson Díaz** - [NDz23](https://github.com/NDz23)
