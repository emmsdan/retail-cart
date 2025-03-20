# RetailCart
### Ecommerce Project
A modern, responsive ecommerce application built with Angular 18. 
This project demonstrates best practices for building scalable Angular applications with the latest features.

## Features

- **Product Catalog** - Browse and search products
- **Shopping Cart** - Add/remove items, update quantities
- **Responsive Design** - Mobile-first approach
- **Modern UI** - Clean, intuitive interface
- **Discount Support** - Support the use of discount on app
- **Admin panel** - Add new products for users to choose from

## Technologies

- **Angular 18** - Latest version with standalone components
- **Signal-based State Management** - Using Angular's new reactive primitives
- **New Control Flow Syntax** - Using `@if`, `@for` instead of traditional directives
- **TypeScript** - Type-safe development
- **CSS** - Component-scoped styling

## Prerequisites
- Node.js (v20.x or later)
- npm (v10.x or later)
- Angular CLI (v18.x or later)

## Installation

1. Clone the repository:

```shellscript
git clone https://github.com/emmsdan/retail-cart.git
cd retail-cart
```
2. Install dependencies:

```shellscript
npm install
```
3. Start the development server:

```shellscript
ng serve
```
4. Open your browser and navigate to `http://localhost:4200`

## Project Structure
```plaintext
src/
├── app/
│   ├── components/
│   │   ├── cart/
│   │   ├── navbar/
│   │   ├── products/
│   │   │   └── product-card/
│   │   │   └── product-list/
│   │   │   └── product-management/
│   ├── models/
│   │   └── cart.model.ts
│   │   └── product.model.ts
│   ├── services/
│   │   ├── cart.service.ts
│   │   └── product.service.ts
│   │   └── toast.service.ts
│   └── app.component.ts
├── assets/
├── styles.css
└── main.ts
└── index.html
```

### Benefits of this approach:

- Fine-grained reactivity
- Improved performance
- Type safety
- No external dependencies

## Building for Production
To build the application for production:

```shellscript
ng build --configuration production
```
The build artifacts will be stored in the `dist/` directory.


## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request

### Coding Standards
- Follow the [Angular Style Guide](https://angular.io/guide/styleguide)
- Write unit tests for new features
- Ensure all tests pass before submitting a PR
- Use descriptive commit messages

## Future Enhancements

- User authentication
- Product details page
- Wishlist functionality
- Order history
- Payment integration
- Full Admin dashboard

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author
- [EmmsDan](https://emmsdan.com) - https://emmsdan.com
---



For questions or support, please open an issue in the repository.
