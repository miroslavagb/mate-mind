<template>
    <div class="dropdown z-50 dropdown-end">
      <label tabindex="0" class="btn btn-ghost m-1">{{ $t('loginTranslations.loginButton') }}</label>
      <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
        <li>
          <router-link to="/login">{{ $t('loginTranslations.loginButton') }}</router-link>
        </li>
        <li>
          <router-link to="/registration">{{ $t('registerTranslations.registerButton') }}</router-link>
        </li>
        <li>
          <router-link to="/logout">{{ $t('logoutTranslations.logoutButton') }}</router-link>
        </li>
      </ul>
    </div>
  </template>
  

  