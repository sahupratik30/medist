import { useNavigate } from "react-router-dom";
import Button from "../components/UI/Button";
import { isUserAuthenticated } from "../guards/auth-guard";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { regexConfig } from "../config/regex-config";
import { updateUserProfile } from "../http/http-calls";
import { errorHandler, showToast } from "../helpers";
import { setUserData } from "../redux/slices/auth-slice";

const UserProfile = () => {
  const [formFields, setFormFields] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    country: "",
    streetAddress: "",
    city: "",
    state: "",
    postalCode: "",
  });
  const [isDirty, setIsDirty] = useState({
    username: false,
    phoneNumber: false,
    country: false,
    streetAddress: false,
    city: false,
    state: false,
    postalCode: false,
  });
  const [errors, setErrors] = useState({
    username: null,
    phoneNumber: null,
    country: null,
    streetAddress: null,
    city: null,
    state: null,
    postalCode: null,
  });
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => state?.auth || {});

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = isUserAuthenticated();

  // function to validate form fields
  const _validateFormFields = ({ newFormFields, newIsDirty }) => {
    return new Promise((resolve) => {
      let isFormValid = true;
      let newErrors = {};
      Object.keys(newFormFields).forEach((key) => {
        if (newIsDirty[key]) {
          switch (key) {
            case "username":
              if (newFormFields[key]?.trim()?.length) {
                if (regexConfig.name.test(newFormFields[key])) {
                  newErrors[key] = null;
                  newIsDirty[key] = false;
                } else {
                  newErrors[key] =
                    "*Must contain 2-25 characters without digits or special symbols";
                  isFormValid = false;
                }
              } else {
                newErrors[key] = null;
                newIsDirty[key] = false;
              }
              break;

            case "phoneNumber":
              if (String(newFormFields[key])?.trim()?.length) {
                if (regexConfig.phone.test(+newFormFields[key])) {
                  newErrors[key] = null;
                  newIsDirty[key] = false;
                } else {
                  newErrors[key] = "*Invalid phone number";
                  isFormValid = false;
                }
              } else {
                newErrors[key] = null;
                newIsDirty[key] = false;
              }
              break;

            case "postalCode":
              if (String(newFormFields[key])?.trim()?.length) {
                if (regexConfig.postalCode.test(+newFormFields[key])) {
                  newErrors[key] = null;
                  newIsDirty[key] = false;
                } else {
                  newErrors[key] = "*Invalid postal code";
                  isFormValid = false;
                }
              } else {
                newErrors[key] = null;
                newIsDirty[key] = false;
              }
              break;
            default:
          }
        }
      });

      setIsDirty((prev) => ({ ...prev, ...newIsDirty }));
      setErrors((prev) => ({ ...prev, ...newErrors }));

      resolve(isFormValid);
    });
  };

  // function to handle event when user starts typing in any form field
  const _onChangeFormFields = (key, value) => {
    const newFormFields = { ...formFields };
    newFormFields[key] = value;
    setFormFields(newFormFields);
  };

  // function to handle event when focus is lost from any form field
  const _onBlurFormFields = (key) => {
    const newFormFields = { ...formFields };
    const newIsDirty = { ...isDirty };
    newIsDirty[key] = true;
    _validateFormFields({ newFormFields, newIsDirty });
  };

  // function to handle form submission for edit profile
  const _onEditProfile = async (e) => {
    if (e) e.preventDefault();
    const newFormFields = { ...formFields };
    const newIsDirty = {
      username: true,
      phoneNumber: true,
      country: true,
      streetAddress: true,
      city: true,
      state: true,
      postalCode: true,
    };

    const isValid = await _validateFormFields({ newFormFields, newIsDirty });

    if (!isValid) return;

    // continue with form submission
    setLoading(true);
    const payload = {
      username: newFormFields.username?.trim() || null,
      Country: newFormFields.country || null,
      street_address: newFormFields.streetAddress?.trim() || null,
      City: newFormFields.city?.trim() || null,
      state: newFormFields.state?.trim() || null,
      postalcode: +newFormFields.postalCode || null,
      phoneNumber: +newFormFields.phoneNumber || null,
    };

    try {
      const res = await updateUserProfile(user?.id, payload);
      dispatch(setUserData(res));
      setLoading(false);
      showToast(
        "Profile updated successfully",
        "success",
        2000,
        "profile updated"
      );
    } catch (error) {
      errorHandler(error);
      setLoading(false);
    }
  };

  // Effect to prefill form data
  useEffect(() => {
    if (user) {
      const newFormFields = {
        username: user?.username || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        country: user?.Country || "",
        streetAddress: user?.street_address || "",
        city: user?.City || "",
        state: user?.state || "",
        postalCode: user?.postalcode || "",
      };
      setFormFields(newFormFields);
    }
  }, [user]);

  // Effect to check if user is authenticated
  useEffect(() => {
    if (!isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  return (
    <div className="container my-8">
      <form
        className="mx-auto w-full sm:max-w-2xl"
        onSubmit={(e) => _onEditProfile(e)}
      >
        <div className="space-y-12">
          <h2 className="text-xl font-semibold leading-7 text-gray-900 xs:text-2xl">
            Edit Profile
          </h2>

          <div className="pb-12">
            <h2 className="text-sm font-semibold leading-7 text-gray-900 xs:text-base">
              Personal Information
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="full-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Full name
                </label>
                <div className="form-control mt-2">
                  <input
                    type="text"
                    name="full-name"
                    value={formFields["username"]}
                    onChange={(e) =>
                      _onChangeFormFields("username", e.target.value)
                    }
                    onBlur={() => _onBlurFormFields("username")}
                    id="full-name"
                    autoComplete="given-name"
                    className="formInput"
                  />
                  {errors["username"] && (
                    <p className="input-error">{errors["username"]}</p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formFields["email"]}
                    autoComplete="email"
                    className="formInput"
                    readOnly
                    disabled
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Phone Number
                </label>
                <div className="form-control mt-2">
                  <input
                    id="phone"
                    name="phone"
                    type="phone"
                    value={formFields["phoneNumber"]}
                    onChange={(e) =>
                      _onChangeFormFields("phoneNumber", e.target.value)
                    }
                    onBlur={() => _onBlurFormFields("phoneNumber")}
                    autoComplete="phone"
                    className="formInput"
                  />
                  {errors["phoneNumber"] && (
                    <p className="input-error">{errors["phoneNumber"]}</p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Country
                </label>
                <div className="form-control mt-2">
                  <select
                    id="country"
                    name="country"
                    autoComplete="country-name"
                    className="formInput px-1"
                    value={formFields["country"]}
                    onChange={(e) =>
                      _onChangeFormFields("country", e.target.value)
                    }
                    onBlur={() => _onBlurFormFields("country")}
                  >
                    <option value="">Select</option>
                    <option value="India">India</option>
                  </select>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="street-address"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Street address
                </label>
                <div className="form-control mt-2">
                  <input
                    type="text"
                    name="street-address"
                    id="street-address"
                    autoComplete="street-address"
                    className="formInput"
                    value={formFields["streetAddress"]}
                    onChange={(e) =>
                      _onChangeFormFields("streetAddress", e.target.value)
                    }
                    onBlur={() => _onBlurFormFields("streetAddress")}
                  />
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  City
                </label>
                <div className="form-control mt-2">
                  <input
                    type="text"
                    name="city"
                    id="city"
                    autoComplete="address-level2"
                    className="formInput"
                    value={formFields["city"]}
                    onChange={(e) =>
                      _onChangeFormFields("city", e.target.value)
                    }
                    onBlur={() => _onBlurFormFields("city")}
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="region"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  State / Province
                </label>
                <div className="form-control mt-2">
                  <input
                    type="text"
                    name="region"
                    id="region"
                    autoComplete="address-level1"
                    className="formInput"
                    value={formFields["state"]}
                    onChange={(e) =>
                      _onChangeFormFields("state", e.target.value)
                    }
                    onBlur={() => _onBlurFormFields("state")}
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="postal-code"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  ZIP / Postal code
                </label>
                <div className="form-control mt-2">
                  <input
                    type="text"
                    name="postal-code"
                    id="postal-code"
                    autoComplete="postal-code"
                    className="formInput"
                    value={formFields["postalCode"]}
                    onChange={(e) =>
                      _onChangeFormFields("postalCode", e.target.value)
                    }
                    onBlur={() => _onBlurFormFields("postalCode")}
                  />
                  {errors["postalCode"] && (
                    <p className="input-error">{errors["postalCode"]}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center">
          <Button disabled={loading} type="submit" className="primary-btn">
            {loading ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
