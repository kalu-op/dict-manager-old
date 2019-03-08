<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/app/accounting")
 */
class AccountingController extends AbstractController
{
    /**
     * @Route("/show", name="accounting")
     */
    public function index()
    {
        return $this->render('accounting/show.html.twig', [
            'data' => 'lucas',
        ]);
    }
}