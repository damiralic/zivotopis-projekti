using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class WoodCounter : MonoBehaviour
{
    [SerializeField]
    private Text woodCounter;

    private int woodAmount;
    
    void Start()
    {
        woodAmount = 0;
    }

    // Update is called once per frame
    void Update()
    {
        woodCounter.text = "0" + woodAmount;  
    }

    private void OnTriggerEnter(Collider collision)
    {
        if (collision.GetComponent<TreeScript>())
        {
            woodAmount += 1;
        }
    }
}
