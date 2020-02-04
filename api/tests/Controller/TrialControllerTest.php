<?php
namespace App\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class TrialControllerTest extends WebTestCase
{

    public function testTrial()
    {
        $client = static::createClient();

        $client->request('GET', '/trial/KNNNV/NNVV');

        $this->assertEquals(200, $client->getResponse()->getStatusCode());
    }

    public function testTrialWinsParty1()
    {
        $client = static::createClient();

        $client->request('GET', '/trial/KNNNV/NNVV');

        $this->assertEquals(array('winner' => 1), json_decode($client->getResponse()->getContent(), true));
    }

    public function testTrialWinsParty2()
    {
        $client = static::createClient();

        $client->request('GET', '/trial/NNVV/KNNNV');

        $this->assertEquals(array('winner' => 2), json_decode($client->getResponse()->getContent(), true));
    }
}
