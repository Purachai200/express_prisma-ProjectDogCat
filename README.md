Get Postman to test Query [DogAndCatQuery.postman_collection.json](https://github.com/Purachai200/express_prisma-ProjectDogCat/files/14076797/DogAndCatQuery.postman_collection.json)

** env_Guide **

PORT=

DATABASE_URL=
CLOUDINARY_SECRET=
JWT_SECRET=
JWT_EXPIRES_IN=

-----------------------

** API Service **

method        path                auth          params                                 body

- Auth Route -
POST         /auth/register         0             none          {fisrt_name, last_name, username, password, email}
POST         /login/admin           0             none          {username, password}
POST        /login/recorder         0             none          {username, password}
GET         /get-admin              1(admin)      none          none
GET         /get-recorder           1(recorder)   none          none
GET         /getUnreg/:data         0             :data         none
GET         /getPet/:data                         :data         none

- Admin Route -
method        path                                  auth          params                                 body

#Subdistrict
POST         /subdistrict                           1(admin)      none                       { name ,sub_district ,district ,province ,zipcode }
PATCH        /update-subdistrict/:subdistrictId     1(admin)      subdistrictId              { name ,sub_district ,district ,province ,zipcode }
DELETE       /delete-subdistrict/:subdistrictId     1(admin)      subdistrictId              none

#Recorder
POST         /recorder                              1(admin)      none                        { first_name, last_name, username, password, email, subdistrictId}
PATCH        /update-recorder/:recorderId           1(admin)      recorderId                  { first_name, last_name, username, password, email}
DELETE       /delete-recorder/:recorderId           1(admin)      recorderId                  none

#Get
GET          /get/:data                             1(admin)      :data = (DataTable)         none

GET          /get/table/:data/from/:find/:ref       1(admin)      :data = (DataTable), 
                                                                  :find = (where? เช่น id), 
                                                                  :ref = (1 หรือ หา id = 1)    none  (Use For Find Number)

GET          /get/string/table/:data/from/:find/:ref 1(admin)     :data = (DataTable), 
                                                                  :find = (where? เช่น id), 
                                                                  :ref = (1 หรือ หา id = 1)    none  (Use For Find String)

- Recorder Route -
method        path                                  auth          params                                 body
#Address
POST          /create-address                    1(recorder)      none                         {house_name, house_number, moo}
PATCH         /update-address/:addressId         1(recorder)      addressId                    {house_name, house_number, moo}
DELETE        /delete-address/:addressId         1(recorder)      addressId                    none

#Pet-Owner
POST          /:addressId/create-pet-owner       1(recorder)      addressId                    {first_name, last_name, identity_number, tel}
PATCH         /update-petOwner/:petOwnerId       1(recorder)      petOwnerId                   {first_name, last_name, identity_number, tel}
DELETE        /delete-petOwner/:petOwnerId       1(recorder)      petOwnerId                   none

#Pet
POST          /create-pet/:petOwnerId            1(recorder)      petOwnerId      {name, type, gender, color, defect, age, vaccined, vaccine_date, sterilized, location_id, nature_id}
PATCH         /update-pet/:petId                 1(recorder)      petId           {name, type, gender, color, defect, age, vaccined, vaccine_date, sterilized, location_id, nature_id}
DELETE        /delete/:petId                     1(recorder)      petId           none

#Nature
POST          /create-nature                     1(recorder)      none            { name_nature }
PATCH         /update-nature/:natureId           1(recorder)      natureId        { name_nature }            
DELETE        /delete-nature/:natureId           1(recorder)      natureId        none

#Location
POST          /create-location                   1(recorder)       none            { location, name_location }
PATCH         /update-location/:locationId       1(recorder)      locatinId        { location, name_location }
DELETE        /delete-location/:locationId       1(recorder)      locationId       none

#Unregister-Pet
POST          /create-unregister/:subdistrictId  1(recorder)      subdistrictId    { address_moo, dog_amount, cat_amount, name_info, vaccined, sterilized, location_id }
PATCH         /update-unregistered/:unregisterId 1(recorder)      unregisterId     { address_moo, dog_amount, cat_amount, name_info, vaccined, sterilized }
DELETE        /delete-unregistered/:unregisterId 1(recorder)      unregisterId     none

#Get Data
GET          /get/:data                             1(recorder)       :data = (DataTable)         none
GET          /get/table/:data/from/:find/:ref       1(recorder)       :data = (DataTable), 
                                                                      :find = (where? เช่น id), 
                                                                      :ref = (1 หรือ หา id = 1)    none
GET          /getByData/table/:data/from/:find/       1(recorder)       :data = (DataTable), 
                                                                        :find = (where? เช่น id), 
                                                                        :ref = (1 หรือ หา id = 1)    req.user