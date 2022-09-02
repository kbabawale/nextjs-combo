import { inject, injectable } from 'inversify';
import { action, autorun, computed, observable, reaction } from 'mobx';
import { IBLoC } from '../../../ioc';
import {
  ChangeEmailForm,
  ChangeNameForm,
  ChangePasswordForm,
} from '../../../model/FormType';
import {
  ChangeEmailPayload,
  ChangePasswordRequest,
  LogoutRequest,
  RequestsRequest,
  RequestsType,
} from '../../../model/HttpRequest';
import { AdminRequests, Distributor } from '../../../model/HttpResponse';
import { AuthServiceSymbol, IAuthService } from '../../../service/auth.service';
import { AuthStoreSymbol, IAuthStore } from '../../../store/auth.store';
import { UtilFunction } from '../../../util/functions';

@injectable()
export class SettingsBLoC implements IBLoC {
  @inject(AuthServiceSymbol) authService!: IAuthService;
  @inject(AuthStoreSymbol) authStore!: IAuthStore;

  @observable emailRequest!: AdminRequests<ChangeEmailPayload>;

  constructor() {
    setTimeout(() => {
      this.authGuard();
      this.syncPendingRequests();
    }, 100);
  }

  authGuard() {
    if (!this.loggedIn) {
      UtilFunction.navigate('/auth');
    }
  }

  @computed get loggedIn(): boolean {
    return this.authStore.loggedIn;
  }

  @computed get user() {
    return this.authStore.currentUser;
  }

  @computed get token() {
    return this.authStore.token;
  }

  async logout() {
    UtilFunction.showloader();
    try {
      let body: LogoutRequest = {
        platform: 'Distributor',
        refreshtoken: this.token.refresh_token,
        id: this.user._id,
      };

      let result = await this.authService.signOut(body);

      if (result.data) {
        this.authStore.setToken({ access_token: '', refresh_token: '' });
        this.authStore.setLoggedIn(false);
        UtilFunction.navigate('/auth');
      }
    } catch (err) {
    } finally {
      UtilFunction.hideloader();
    }
  }

  changePassword(data: ChangePasswordForm): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      UtilFunction.showloader();
      try {
        let body: ChangePasswordRequest = {
          platform: 'Distributor',
          password: data.currentPassword.trim(),
          id: this.user._id,
        };

        let currentPasswordCheck = await this.authService.comparePassword(body);

        if (currentPasswordCheck.data) {
          let body: ChangePasswordRequest = {
            id: this.authStore.currentUser._id,
            password: data.newPassword.trim(),
            platform: 'Distributor',
          };

          let changePasswordResponse = await this.authService.changePassword(
            body
          );

          if (changePasswordResponse.data) {
            let querystring = {
              userid: this.authStore.currentUser._id,
              type: 'Distributor',
            };
            const searchParams = new URLSearchParams(querystring).toString();
            let newUserDetails = await this.authService.syncMe(searchParams);
            if (newUserDetails.data && newUserDetails.data?.data.length > 0) {
              //update store with new user details
              let newUser: Partial<Distributor> = newUserDetails.data?.data[0];
              this.authStore.setCurrentUser(newUser);
              UtilFunction.notification('Password updated');
              resolve(true);
            }
          }
          resolve(false);
        } else {
          UtilFunction.notification(currentPasswordCheck.message, 'failure');
          resolve(false);
        }
      } catch (err) {
        resolve(false);
      } finally {
        UtilFunction.hideloader();
      }
    });
  }

  changeName(data: ChangeNameForm): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      UtilFunction.showloader();
      try {
        let body: Partial<Distributor> = {
          firstName: data.fullname.trim().split(' ')[0],
          lastName: data.fullname.trim().split(' ')[1],
        };

        let updateNameResponse = await this.authService.updateUser(
          this.user._id,
          body
        );

        if (updateNameResponse.data) {
          let querystring = {
            userid: this.authStore.currentUser._id,
            type: 'Distributor',
          };
          const searchParams = new URLSearchParams(querystring).toString();
          let newUserDetails = await this.authService.syncMe(searchParams);
          if (newUserDetails.data && newUserDetails.data?.data.length > 0) {
            //update store with new user details
            let newUser: Partial<Distributor> = newUserDetails.data?.data[0];
            this.authStore.setCurrentUser(newUser);
            UtilFunction.notification('Name updated');
            resolve(true);
          }
        } else {
          resolve(false);
        }
      } catch (err) {
        resolve(false);
      } finally {
        UtilFunction.hideloader();
      }
    });
  }

  changeEmail(data: ChangeEmailForm): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      UtilFunction.showloader();
      try {
        let checkPasswordBody: ChangePasswordRequest = {
          platform: 'Distributor',
          password: data.password.trim(),
          id: this.user._id,
        };

        let currentPasswordCheck = await this.authService.comparePassword(
          checkPasswordBody
        );
        if (currentPasswordCheck.data) {
          //send request for change email
          let payload: RequestsRequest<ChangeEmailPayload> = {
            type: RequestsType.UPDATEEMAIL,
            payload: {
              newEmail: data.email.trim(),
              userId: this.user._id,
            },
          };
          let sendRequest = await this.authService.sendRequest(payload);
          if (sendRequest.data?._id) {
            UtilFunction.notification('Change Email Request Sent.');
            this.syncPendingRequests();
            resolve(true);
          }
        } else {
          UtilFunction.notification(currentPasswordCheck.message, 'failure');
          resolve(false);
        }
      } catch (err) {
        resolve(false);
      } finally {
        UtilFunction.hideloader();
      }
    });
  }

  async syncPendingRequests() {
    let requests = await this.authService.fetchPendingEmailRequests(
      this.user._id
    );
    if (requests.data && requests.data?.data.length > 0) {
      this.emailRequest = requests.data.data[0];
    }
  }

  async changeProfileImage(image: string) {
    UtilFunction.showloader();
    try {
      let body: Partial<Distributor> = {
        profilePhoto: image,
      };

      let updateNameResponse = await this.authService.updateUser(
        this.user._id,
        body
      );

      if (updateNameResponse.data) {
        let querystring = {
          userid: this.authStore.currentUser._id,
          type: 'Distributor',
        };
        const searchParams = new URLSearchParams(querystring).toString();
        let newUserDetails = await this.authService.syncMe(searchParams);
        if (newUserDetails.data && newUserDetails.data?.data.length > 0) {
          //update store with new user details
          let newUser: Partial<Distributor> = newUserDetails.data?.data[0];
          this.authStore.setCurrentUser(newUser);
          UtilFunction.notification('Image updated');
        }
      }
    } catch (err) {
      UtilFunction.hideloader();
    } finally {
      UtilFunction.hideloader();
    }
  }

  async changeProfileImageCloudinary(image: Blob) {
    UtilFunction.showloader();
    try {
      let formDataPayload = new FormData();

      formDataPayload.append('file', image);
      formDataPayload.append('upload_preset', 'storedash_preset');

      let formDataDeletePayload = new FormData();
      // formDataDeletePayload.append('upload_preset', 'storedash_preset');
      formDataDeletePayload.append('public_id', this.user.profilePhotoPublicID);
      // formDataDeletePayload.append('api_key', '258959376588171');
      // formDataDeletePayload.append('timestamp', Date.now().toString());
      // formDataDeletePayload.append(
      //   'signature',
      //   this.user.profilePhotoSignature
      // );

      //delete previous one before uploading new one
      //TO BE REFACTORED
      if (this.user.profilePhoto.indexOf('res.cloudinary.com')) {
        let deleteImage = await this.authService.deleteFromCloudinary(
          formDataDeletePayload
        );
      }

      let uploadedImage = await this.authService.uploadToCloudinary(
        formDataPayload
      );

      if (uploadedImage.secure_url) {
        let body: Partial<Distributor> = {
          profilePhoto: uploadedImage.secure_url,
          profilePhotoPublicID: uploadedImage.public_id,
          profilePhotoSignature: uploadedImage.signature,
        };

        let updateNameResponse = await this.authService.updateUser(
          this.user._id,
          body
        );
        if (updateNameResponse.data) {
          let querystring = {
            userid: this.authStore.currentUser._id,
            type: 'Distributor',
          };
          const searchParams = new URLSearchParams(querystring).toString();
          let newUserDetails = await this.authService.syncMe(searchParams);
          if (newUserDetails.data && newUserDetails.data?.data.length > 0) {
            //update store with new user details
            let newUser: Partial<Distributor> = newUserDetails.data?.data[0];
            this.authStore.setCurrentUser(newUser);
            UtilFunction.notification('Image updated');
          }
        }
      }
    } catch (err) {
      UtilFunction.hideloader();
    } finally {
      UtilFunction.hideloader();
    }
  }

  onParamsChange() {
    // nothing to do here
  }
}
