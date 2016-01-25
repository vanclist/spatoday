<?php

namespace Pagekit\User\Controller;

use Pagekit\Application as App;
use Pagekit\Application\Exception;
use Pagekit\User\Model\User;

class ResetPasswordController
{
    public function indexAction()
    {
        if (App::user()->isAuthenticated()) {
            return App::redirect();
        }

        return [
            '$view' => [
                'title' => __('Reset'),
                'name'  => 'system/user/reset-request.php'
            ]
        ];
    }

    /**
     * @Request({"email"})
     */
    public function requestAction($email)
    {
        try {

            if (App::user()->isAuthenticated()) {
                return App::redirect();
            }

            if (!App::csrf()->validate()) {
                throw new Exception(__('Invalid token. Please try again.'));
            }

            if (empty($email)) {
                throw new Exception(__('Enter a email address.'));
            }

            if (!$user = User::findByEmail($email)) {
                throw new Exception(__('Invalid email address.'));
            }

            if ($user->isBlocked()) {
                throw new Exception(__('Your account has not been activated or is blocked.'));
            }

            $user->activation = App::get('auth.random')->generateString(32);

            $url = App::url('@user/resetpassword/confirm', ['user' => $user->username, 'key' => $user->activation], true);

            try {

                $mail = App::mailer()->create();
                $mail->setTo($user->email)
                     ->setSubject(__('Reset password for %site%.', ['%site%' => App::module('system/site')->config('title')]))
                     ->setBody(App::view('system/user:mails/reset.php', compact('user', 'url', 'mail')), 'text/html')
                     ->send();

            } catch (\Exception $e) {
                throw new Exception(__('Unable to send confirmation link.'));
            }

            $user->save();

            App::message()->success(__('Check your email for the confirmation link.'));

            return App::redirect();

        } catch (Exception $e) {
            App::message()->error($e->getMessage());
        }

        return App::redirect('@user/resetpassword');
    }

    /**
     * @Request({"user", "key"})
     */
    public function confirmAction($username = "", $activation = "")
    {
        if (empty($username) || empty($activation) || !$user = User::where(compact('username', 'activation'))->first()) {
            App::message()->error(__('Invalid key.'));
            return App::redirect();
        }

        if ($user->isBlocked()) {
            App::message()->error(__('Your account has not been activated or is blocked.'));
            return App::redirect();
        }

        if ('POST' === App::request()->getMethod()) {

            try {

                if (!App::csrf()->validate()) {
                    throw new Exception(__('Invalid token. Please try again.'));
                }

                $password = App::request()->request->get('password');

                if (empty($password)) {
                    throw new Exception(__('Enter password.'));
                }

                if ($password != trim($password)) {
                    throw new Exception(__('Invalid password.'));
                }

                $user->password = App::get('auth.password')->hash($password);
                $user->activation = null;
                $user->save();

                App::message()->success(__('Your password has been reset.'));

                return App::redirect();

            } catch (Exception $e) {
                App::message()->error($e->getMessage());
            }
        }

        return [
            '$view' => [
                'title' => __('Reset Confirm'),
                'name'  => 'system/user/reset-confirm.php'
            ],
            'username' => $username,
            'activation' => $activation
        ];
    }
}
