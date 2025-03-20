const categories = [
  {
    name: "category1",
    subcategories: [
      {
        name: "category2",
        subcategories: [],
      },
      {
        name: "category3",
        subcategories: [
          {
            name: "category4",
            subcategories: [],
          },
        ],
      },
    ],
  },
  {
    name: "category5",
    subcategories: [],
  },
];

// enfoque recursivo, podría llenar la pila de funciones en estructuras muy grandes y causar
// un stack overflow, se podría resolver usando algoritmos algo más complejos como una pila
// a modo de stack de funciones, de manera que la podamos manejar e ir vaciando.
// También al ayudarnos de los return, se dificulta mucho escribir un mensaje de "No se ha encontrado",
// aunque ésto se podría solucionar con estructuras de datos como objetos, cosa que no veo necesaria en éste caso.
const getRecursiveCategoryPath = (categories, categoryName) => {
  if (!categories.length) return;
  for (const item of categories) {
    const category = item;
    if (category.name == categoryName) {
      return `/${category.name}`;
    }

    const path = getRecursiveCategoryPath(category.subcategories, categoryName);
    if (path) {
      return `/${category.name}${path}`;
    }
  }
};

const assert = require("assert");
assert.strictEqual(
  getRecursiveCategoryPath(categories, "category4"),
  "/category1/category3/category4"
);
assert.strictEqual(
  getRecursiveCategoryPath(categories, "category2"),
  "/category1/category2"
);
assert.strictEqual(
  getRecursiveCategoryPath(categories, "category5"),
  "/category5"
);
assert.strictEqual(
  getRecursiveCategoryPath(categories, "category1"),
  "/category1"
);
assert.strictEqual(
  getRecursiveCategoryPath(categories, "category3"),
  "/category1/category3"
);
assert.strictEqual(
  getRecursiveCategoryPath(categories, "category8"),
  undefined
);

console.log("All good -- recursive ");

// enfoque iterativo, más complejo y dependiente de estructuras de datos como pilas o colas ( en éste caso se trata de un FIFO )
// en éste caso si podemos controlar un mensaje indicando que la categoria no ha podido encontrarse
const getIterableCategoryPath = (categoriesAttr, categoryName) => {
  const categoriesStack = categoriesAttr.map((category) => {
    return {
      name: category.name,
      children: category.subcategories,
      path: `/${category.name}`,
    };
  });

  while (categoriesStack.length > 0) {
    const { name, path: currentPath, children } = categoriesStack.shift();

    if (name == categoryName) {
      return currentPath;
    }

    if (children?.length > 0) {
      categoriesStack.push(
        ...children.map((category) => {
          return {
            name: category.name,
            children: category.subcategories,
            path: `${currentPath}/${category.name}`,
          };
        })
      );
    }
  }
  return "Category not found";
};

// unit test
assert.strictEqual(
  getIterableCategoryPath(categories, "category4"),
  "/category1/category3/category4"
);
assert.strictEqual(
  getIterableCategoryPath(categories, "category2"),
  "/category1/category2"
);
assert.strictEqual(
  getIterableCategoryPath(categories, "category5"),
  "/category5"
);
assert.strictEqual(
  getIterableCategoryPath(categories, "category1"),
  "/category1"
);
assert.strictEqual(
  getIterableCategoryPath(categories, "category3"),
  "/category1/category3"
);
assert.strictEqual(
  getIterableCategoryPath(categories, "category8"),
  "Category not found"
);

console.log("All good -- iterable ");

// cabe destacar que, por cuestiones de tiempo, no he implementado validaciones de la entrada de datos
// o bloques de código try catch con lanzamiento de errores en función del tipo de error
// aunque quizás lo mejor sea simplemente usar TypeScript !!
