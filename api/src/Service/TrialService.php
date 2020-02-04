<?php


class TrialService
{
    public static function startTrial(
        $party1,
        $party2
    ): int
    {
        $party1 = str_split($party1);
        $party2 = str_split($party2);

        $trialService = new TrialService();
        $party1points = $trialService->getPunctuationFromParty($party1);
        $party2points = $trialService->getPunctuationFromParty($party2);

        return $party1points > $party2points ? 1 : 2;
    }

    private function getPunctuationFromParty($party): int
    {
        $countsOfEachSignature = array_count_values($party);

        if (array_key_exists('K', $countsOfEachSignature)) {
            unset($countsOfEachSignature['V']);
            $pointsOfEachSignature['K'] = 5 * $countsOfEachSignature['K'];
        }

        if (array_key_exists('N', $countsOfEachSignature)) {
            $pointsOfEachSignature['N'] = 2 * $countsOfEachSignature['N'];
        }

        if (array_key_exists('V', $countsOfEachSignature)) {
            $pointsOfEachSignature['V'] = $countsOfEachSignature['V'];
        }

        return array_sum($pointsOfEachSignature);
    }
}