Directory structure:
└── webakash1806-bike-show/
    ├── README.md
    ├── admin/
    │   ├── README.md
    │   ├── components.json
    │   ├── index.html
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── tailwind.config.ts
    │   ├── tsconfig.app.json
    │   ├── tsconfig.json
    │   ├── tsconfig.node.json
    │   ├── vite.config.ts
    │   ├── .gitignore
    │   ├── public/
    │   └── src/
    │       ├── App.tsx
    │       ├── index.css
    │       ├── main.tsx
    │       ├── vite-env.d.ts
    │       ├── Helper/
    │       │   ├── axiosBaseQuery.ts
    │       │   └── axiosInstance.ts
    │       ├── Hooks/
    │       │   ├── use-pagination.ts
    │       │   └── useDebounce.tsx
    │       ├── Layout/
    │       │   └── HomeLayout.tsx
    │       ├── Pages/
    │       │   ├── AddAccessories.tsx
    │       │   ├── AddBike.tsx
    │       │   ├── AddScooty.tsx
    │       │   ├── AllAccessories.tsx
    │       │   ├── AllBike.tsx
    │       │   ├── AllForms.tsx
    │       │   ├── AllScooty.tsx
    │       │   ├── BikePreview.tsx
    │       │   ├── Home.tsx
    │       │   ├── ScootyPreview.tsx
    │       │   └── Auth/
    │       │       ├── Login.tsx
    │       │       ├── ProfileCard.tsx
    │       │       ├── Register.tsx
    │       │       └── ResetPassword.tsx
    │       ├── Redux/
    │       │   ├── store.ts
    │       │   ├── API/
    │       │   │   ├── AccessoriesApi.ts
    │       │   │   ├── BikeAPI.ts
    │       │   │   ├── FormApi.ts
    │       │   │   ├── HelmetApi.ts
    │       │   │   └── ScootyApi.ts
    │       │   └── Slice/
    │       │       └── AuthSlice.ts
    │       ├── assets/
    │       ├── components/
    │       │   ├── ContactMessage.tsx
    │       │   ├── DashboardLoading.tsx
    │       │   ├── Loaders.tsx
    │       │   ├── Pagination.tsx
    │       │   ├── ProductEnquiryMessage.tsx
    │       │   ├── SelectColor.tsx
    │       │   ├── TestDriveMessage.tsx
    │       │   ├── comp-190.tsx
    │       │   ├── comp-381.tsx
    │       │   ├── comp-433.tsx
    │       │   ├── comp-437.tsx
    │       │   ├── comp-474.tsx
    │       │   ├── Auth/
    │       │   │   └── ProtectedRoute.tsx
    │       │   ├── Bike/
    │       │   │   ├── EditBike.tsx
    │       │   │   └── EditScooty.tsx
    │       │   ├── Forms/
    │       │   │   ├── Banner.tsx
    │       │   │   ├── Accessories/
    │       │   │   │   ├── AddAccessoriesForm.tsx
    │       │   │   │   ├── AddHelmetForm.tsx
    │       │   │   │   ├── EditAccessories.tsx
    │       │   │   │   └── EditHelmet.tsx
    │       │   │   ├── BikeForm/
    │       │   │   │   ├── AddBikeForm.tsx
    │       │   │   │   ├── AddBikeSpecs.tsx
    │       │   │   │   ├── ColorsFeaturesForm.tsx
    │       │   │   │   ├── EditBikeForm.tsx
    │       │   │   │   ├── EditBikeSpecs.tsx
    │       │   │   │   └── EditColorsFeatures.tsx
    │       │   │   └── ScootyForm/
    │       │   │       ├── AddScootyForm.tsx
    │       │   │       ├── AddScootySpecs.tsx
    │       │   │       ├── ColorsFeaturesForm.tsx
    │       │   │       ├── EditColorsFeatures.tsx
    │       │   │       ├── EditScootyForm.tsx
    │       │   │       └── EditScootySpecs.tsx
    │       │   └── ui/
    │       │       ├── accordion.tsx
    │       │       ├── badge.tsx
    │       │       ├── button.tsx
    │       │       ├── checkbox.tsx
    │       │       ├── input.tsx
    │       │       ├── label.tsx
    │       │       ├── pagination.tsx
    │       │       ├── popover.tsx
    │       │       ├── scroll-area.tsx
    │       │       ├── select-native.tsx
    │       │       ├── sidebar.tsx
    │       │       ├── skeleton.tsx
    │       │       ├── table.tsx
    │       │       ├── tabs.tsx
    │       │       └── textarea.tsx
    │       ├── interfaces/
    │       │   └── interface.ts
    │       └── lib/
    │           └── utils.ts
    ├── client/
    │   ├── README.md
    │   ├── components.json
    │   ├── eslint.config.js
    │   ├── index.html
    │   ├── jsconfig.json
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── postcss.config.js
    │   ├── tailwind.config.js
    │   ├── vite.config.js
    │   ├── .gitignore
    │   ├── public/
    │   └── src/
    │       ├── App.jsx
    │       ├── index.css
    │       ├── main.jsx
    │       ├── Helper/
    │       │   ├── axiosBaseQuery.js
    │       │   └── axiosInstance.js
    │       ├── Layout/
    │       │   └── HomeLayout.jsx
    │       ├── Pages/
    │       │   ├── About.jsx
    │       │   ├── AllAccessories.jsx
    │       │   ├── BikePage.jsx
    │       │   ├── BikePreview.jsx
    │       │   ├── Contact.jsx
    │       │   ├── EMICalculator.jsx
    │       │   ├── Enquiry.jsx
    │       │   ├── Exchange.jsx
    │       │   ├── Finance.jsx
    │       │   ├── Home.jsx
    │       │   ├── Insurance.jsx
    │       │   ├── RingSize.jsx
    │       │   ├── ScootyPage.jsx
    │       │   ├── ScootyPreview.jsx
    │       │   ├── Service.jsx
    │       │   └── TestDrive.jsx
    │       ├── Redux/
    │       │   ├── store.js
    │       │   └── AllApi/
    │       │       ├── BikeApi.js
    │       │       └── FormApi.js
    │       ├── assets/
    │       ├── components/
    │       │   ├── AboutSection.jsx
    │       │   ├── CTA.jsx
    │       │   ├── CallbackForm.jsx
    │       │   ├── EnquiryForm.jsx
    │       │   ├── FeatureSection.jsx
    │       │   ├── Footer.jsx
    │       │   ├── Hero.jsx
    │       │   ├── MyRecaptchaProvider.jsx
    │       │   ├── Navbar.jsx
    │       │   ├── ProductEnquiryForm.jsx
    │       │   ├── QuoteForm.jsx
    │       │   ├── TestDriveForm.jsx
    │       │   ├── Testimonial.jsx
    │       │   ├── comp-27.jsx
    │       │   └── ui/
    │       │       ├── 3d-card.jsx
    │       │       ├── animated-modal.jsx
    │       │       ├── background-beams-with-collision.jsx
    │       │       ├── background-beams.jsx
    │       │       ├── bento-grid.jsx
    │       │       ├── button.jsx
    │       │       ├── calendar.jsx
    │       │       ├── cover.jsx
    │       │       ├── hero-highlight.jsx
    │       │       ├── hover-border-gradient.jsx
    │       │       ├── images-slider.jsx
    │       │       ├── input.jsx
    │       │       ├── label.jsx
    │       │       ├── marquee.jsx
    │       │       ├── popover.jsx
    │       │       ├── radio-group.jsx
    │       │       ├── scroll-area.jsx
    │       │       ├── select-native.jsx
    │       │       ├── shine-border.jsx
    │       │       ├── slider.jsx
    │       │       ├── table.jsx
    │       │       ├── tabs.jsx
    │       │       ├── textarea.jsx
    │       │       ├── timeline.jsx
    │       │       ├── tooltip.jsx
    │       │       └── wobble-card.jsx
    │       ├── hooks/
    │       │   └── use-slider-with-input.js
    │       └── lib/
    │           └── utils.js
    └── server/
        ├── app.js
        ├── package-lock.json
        ├── package.json
        ├── server.js
        ├── .env.example.js
        ├── .gitignore
        ├── config/
        │   └── dbConnection.js
        ├── controllers/
        │   ├── accessories.controller.js
        │   ├── auth.controller.js
        │   ├── bike.controller.js
        │   ├── form.controller.js
        │   ├── helmet.controller.js
        │   ├── miscellaneous.controller.js
        │   ├── scooty.controller.js
        │   └── socketController.js
        ├── middlewares/
        │   ├── auth.middleware.js
        │   ├── error.middleware.js
        │   └── multer.middleware.js
        ├── models/
        │   ├── accessories.model.js
        │   ├── auth.model.js
        │   ├── bike.model.js
        │   ├── contact.model.js
        │   ├── helmet.model.js
        │   ├── miscellaneous.model.js
        │   ├── productEnquiry.model.js
        │   ├── scooty.model.js
        │   ├── specification.model.js
        │   └── testDriveForm.model.js
        ├── routes/
        │   ├── accessories.routes.js
        │   ├── auth.routes.js
        │   ├── bike.routes.js
        │   ├── form.routes.js
        │   ├── helmet.routes.js
        │   ├── miscellaneous.routes.js
        │   └── scooty.routes.js
        ├── uploads/
        └── utils/
            ├── asyncHandler.js
            ├── error.utils.js
            ├── fileUpload.utils.js
            └── mail.utils.js
