using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class isClickedBad : MonoBehaviour
{
    public GameObject particles;
    public Transform Player;
    void OnMouseDown()
    {
        ScoreCounter.scoreValue -= Random.Range(10, 30);
        Instantiate(particles, Player.transform.position, Quaternion.identity);
        Destroy(gameObject);

    }
}
