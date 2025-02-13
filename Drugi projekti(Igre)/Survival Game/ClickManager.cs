using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ClickManager : MonoBehaviour
{
    public float distance;
    public Transform playerTransform;
    public Transform itemTransform;
    // Update is called once per frame

    void Update()
    {
        if (Input.GetMouseButtonDown(0))
        {
            var ray = UnityEngine.Camera.main.ScreenPointToRay(Input.mousePosition);
            RaycastHit hit;

            if (Physics.Raycast(ray, out hit, 100))
            {
                // whatever tag you are looking for on your game object
                if (hit.collider.tag == "HealthyTree" && Vector3.Distance(playerTransform.position, itemTransform.position) <= distance)
                {
                    Tree.instance.TakeDamage();
                }
            }
        }
    }
}
