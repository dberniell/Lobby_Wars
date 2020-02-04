<?php
// src/Controller/TrialController.php
namespace App\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class TrialController
{
    /**
    * @Route("/trial/{party1}/{party2}", name="trial")
    */
    public function trial($party1, $party2)
    {
        $winner = \TrialService::startTrial($party1, $party2);

        return new JsonResponse(
            array('winner' => $winner)
        );
    }
}