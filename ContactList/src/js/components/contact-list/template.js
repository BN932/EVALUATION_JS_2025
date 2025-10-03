export default function (){    
    return `  
      <!-- Aside gauche pour le formulaire -->
      <aside class="form w-1/3 bg-gray-200 p-6 pb-12">
        <h2 class="text-xl font-bold mb-4">Add a Contact</h2>
        <div class=" firstname mb-4">
          <label class="block text-gray-700">Firstname</label>
          <input
            type="text"
            class=" firstname mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Alex"
          />
        </div>
        <div class=" lastname mb-4">
          <label class="block text-gray-700">Lastname</label>
          <input
            type="text"
            class=" lastname mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Doe"
          />
        </div>
        <div class="email mb-4">
          <label class="block text-gray-700">Email</label>
          <input
            type="email"
            class=" email mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="alex.doe@gmail.com"
          />
        </div>
        <button
          class="addContact w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
        >
          Add
        </button>
      </aside>

      <!-- Section droite pour la liste des contacts -->
      <section class="w-2/3 p-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold mb-4">Contacts List</h2>
          <p class="text-gray-600 mb-4">
            Contacts Count : <span class="count font-bold"></span>
          </p>
        </div>

        <!-- Filtre de recherche -->
        <div class="mb-4">
          <input
            type="text"
            class="searchBar mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Search a contact"
          />
        </div>

        <!-- Liste des contacts triée et filtrée -->
        <table class="table-auto w-full contacts-table">
          <thead>
            <tr class="bg-gray-200">
              <th class="text-left p-4 rounded-tl-lg">
                <a class="sort-firstname" href="#">Firstname</a>
              </th>
              <th class="text-left p-4">
              <a class="sort-lastname" href="#">Lastname</a></th>
              <th class="text-left p-4">
                <a class="sort-email" href="#">Email</a>
              </th>
              <th class="text-right p-4 rounded-tr-lg">Actions</th>
            </tr>
          </thead>
          <tbody class="contactList">
          </tbody>
        </table>
      </section>

      <footer class="w-full bg-gray-500 text-white text-xs p-2">
        &copy; EAFC 2025 Contacts App. All rights reserved.
      </footer>`

};