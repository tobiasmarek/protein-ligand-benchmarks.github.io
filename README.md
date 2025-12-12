# Usage
Hello, Welcome to the protein-ligand-benchmarks github repository! 

If you would like to add a model to the bar chart and table, first locate the dataset you want to extend inside `method_results/<dataset_name>/methods/` (for example `method_results/PLA15/methods/`). Add a new folder that matches the model name and populate it with:

1. `method.json` – metadata describing the method (see existing folders for the expected keys such as `name`, `category`, `description`, `references`, `code`).
2. A `.txt` file that lists the interaction energies for each system in the dataset (the formatting is the same as in the other folders).

Adding a brand new dataset follows the same idea: create `method_results/<dataset_name>/`, add a `dataset.json` file with the dataset metadata (title, description, referenceEnergies, etc.), and place all method folders into the nested `methods/` directory. Once those files are in place, run `python Backend.py` to rebuild `public/data.json`; after that the UI will automatically create a new tab for the dataset.

If you would like to try a new calculator and compare it to the existing ones on the graph please follow the format used for the TorchAni2x model. Create a new file similar to AniTester.py, which will be the same except for the calculator, which will be equal to the new calculator you wish to test. Then in EnergyCalc.py change the initial import statment to: "import method_results.TorchaniCalc.DockedCalc.{New_Calculator_Tester.py} as Docked". Finally, change the "newdict" variable to include the proper description for your new model.

Whenever you add or modify methods (within an existing dataset) or introduce a new calculator/dataset, run `python Backend.py` in a terminal under the `protein-ligand-benchmarks.github.io` directory. This refreshes `public/data.json` so the React app picks up your changes. If you would like to submit these changes to the github.io site please reach out to us! 

Thanks for Visiting!

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
