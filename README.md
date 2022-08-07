# A rosstat statistics visualizer app

The app is being developed in a monorepo based on Lerna.

``` FRONT-END ```

Stack being used: React, Typescript, DevExtreme (as a UI library). SSR is not supported.

Functional component code structure guideline:
1. props destructuring
2. context hooks
3. custom hooks
4. hooks
5. action functions
6. event handlers
7. other logic

Component passing props order:
1. className
2. id
3. eventHandlers
4. other properties

Component accepting props order:
1. booleans (is-values)
2. strings
3. other non functional types
4. functions

Folder structure
1. components - general reusable components made without external libraries envolved
2. dxComponents - general reusable components, made with devextreme library (custom configuration).

Enviroment varibales of the project:
1. REACT_APP_API_URL=http://host:0000/api/
2. INITIAL_MAP_VALUE=Центральный федеральный округ


``` BACK-END ```

The project has the following enviroment variables:
1. NODE_ENV
2. DB_AUTH - the Mongo DB authorization credentials
3. PORT

