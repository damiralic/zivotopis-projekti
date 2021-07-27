using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Unlock : MonoBehaviour
{
    public GameObject firstPanel;
    public GameObject secondPanel;
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        if(Currency.currencyValue >= 50)
        {
            firstPanel.SetActive(false);
        }
        if (Currency.currencyValue >= 100)
        {
            secondPanel.SetActive(false);
        }
    }
}
